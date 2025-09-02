use std::collections::HashSet;

use anyhow::Result;
use model::graph::{Answer, Edge, Graph};
use rand::Rng;
use rand::rngs::SmallRng;
use rand::seq::{IndexedRandom, SliceRandom};
use repository::{graph::GraphRepository, user::UserRepository};

pub struct GraphService {
    pub graph_repository: GraphRepository,
    pub user_repository: UserRepository,
}

impl GraphService {
    pub async fn calculate_graph_size(&self, rng: &mut SmallRng) -> Result<(u32, u32)> {
        let user = self.user_repository.get_user().await?;
        const BASE_NODE_COUNT: u32 = 4;
        const RATING_PER_LEVEL: u32 = 50;
        let node_count = BASE_NODE_COUNT + (user.rating as u32 / RATING_PER_LEVEL);
        let edge_count = rng.random_range((node_count * 3 / 2)..=(node_count * 5 / 2));
        let max_edges = node_count * (node_count - 1) / 2;

        Ok((node_count, edge_count.min(max_edges)))
    }

    pub async fn generate_graph(&self, rng: &mut SmallRng) -> Result<Graph> {
        let (num_nodes, num_edges) = self.calculate_graph_size(rng).await?;
        let mut hamiltonian_cycle: Vec<u32> = (0..num_nodes).collect();

        // Randomize the answer
        hamiltonian_cycle.shuffle(rng);

        let mut edges = Vec::<Edge>::with_capacity(num_edges as usize);
        let mut edge_set: std::collections::HashSet<(u32, u32)> = std::collections::HashSet::new();

        // Create a Hamiltonian cycle
        for i in 0..num_nodes {
            let source = hamiltonian_cycle[i as usize];
            let target = hamiltonian_cycle[((i + 1) % num_nodes) as usize];

            edges.push(Edge { source, target });
            edge_set.insert((source.min(target), source.max(target)));
        }

        // Add additional edges
        let mut possible_edges =
            Vec::<Edge>::with_capacity((num_nodes * (num_nodes - 1) / 2 - num_nodes) as usize);

        for i in 0..num_nodes {
            for j in (i + 1)..num_nodes {
                if !edge_set.contains(&(i, j)) {
                    possible_edges.push(Edge {
                        source: i,
                        target: j,
                    });
                }
            }
        }

        let sampled_edges = possible_edges
            .choose_multiple(rng, (num_edges - num_nodes) as usize)
            .cloned()
            .collect::<Vec<Edge>>();

        edges.extend(sampled_edges);
        // Shuffle the edges to ensure randomness
        edges.shuffle(rng);

        let mut graph = Graph {
            id: 0, // ID will be returned by the repository
            num_nodes,
            edges,
            best_time_ms: None,
            cycle_found: false,
        };

        graph.id = self.graph_repository.create_graph(&graph).await?;

        Ok(graph)
    }

    pub async fn get_graph(&self, graph_id: i64) -> Result<Graph> {
        self.graph_repository.get_graph(graph_id).await
    }

    pub async fn get_graphs(&self) -> Result<Vec<model::graph::GraphMetadata>> {
        self.graph_repository.get_graphs().await
    }

    pub async fn handle_submission(&self, graph_id: i64, answer: &Answer) -> Result<Graph> {
        let mut graph = self.get_graph(graph_id).await?;
        let is_cycle = self.verify_answer(&graph, &answer.path).await?;

        graph.best_time_ms = match graph.best_time_ms {
            Some(best_time) => Some(best_time.min(answer.time_ms)),
            None => Some(answer.time_ms),
        };
        graph.cycle_found = is_cycle || graph.cycle_found;

        const SECONDS_PER_NODE: i32 = 10;
        const SECOND: i32 = 1000;
        let expected_time_ms = graph.num_nodes as i32 * SECONDS_PER_NODE * SECOND;
        const BASE_SCORE: f32 = 100.0;
        let time_bonus = expected_time_ms as f32 / answer.time_ms.max(1) as f32;
        let mut score_diff = BASE_SCORE * time_bonus.min(2.0);

        if is_cycle {
            score_diff = score_diff * 1.25;
        }

        if answer.time_ms as i32 > expected_time_ms * 2 && !is_cycle {
            score_diff = -100.0;
        }

        self.graph_repository.update_graph(&graph).await?;
        self.user_repository
            .update_rating(score_diff as i32)
            .await?;

        Ok(graph)
    }

    pub async fn verify_answer(&self, graph: &Graph, path: &[u32]) -> Result<bool> {
        let visited_nodes = path.iter().cloned().collect::<HashSet<u32>>();

        if path.len() != graph.num_nodes as usize || visited_nodes.len() != graph.num_nodes as usize
        {
            return Err(anyhow::anyhow!(
                "Answer length does not match number of nodes"
            ));
        }

        let edge_set = graph
            .edges
            .iter()
            .map(|e| (e.source.min(e.target), e.source.max(e.target)))
            .collect::<HashSet<(u32, u32)>>();

        for i in 0..path.len() - 1 {
            let source = path[i];
            let target = path[i + 1];

            if !edge_set.contains(&(source.min(target), source.max(target))) {
                return Err(anyhow::anyhow!(
                    "Edge ({}, {}) does not exist",
                    source,
                    target
                ));
            }
        }

        let start_node = match path.first() {
            Some(&node) => node,
            None => return Err(anyhow::anyhow!("Answer is empty")),
        };
        let end_node = match path.last() {
            Some(&node) => node,
            None => return Err(anyhow::anyhow!("Answer is empty")),
        };
        let is_cycle = edge_set.contains(&(start_node.min(end_node), start_node.max(end_node)));

        Ok(is_cycle)
    }
}

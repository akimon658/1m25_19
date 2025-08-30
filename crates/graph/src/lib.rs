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
    pub async fn calculate_graph_size(&self, rng: &mut SmallRng) -> Result<(u8, u8)> {
        let user = self.user_repository.get_user().await?;
        const BASE_NODE_COUNT: u8 = 4;
        const RATING_PER_LEVEL: i64 = 50;
        let node_count = BASE_NODE_COUNT + (user.rating / RATING_PER_LEVEL) as u8;
        let min_edges = node_count; // At least a Hamiltonian cycle
        let max_edges = node_count * (node_count - 1) / 2;
        let edge_count = rng.random_range((min_edges + max_edges / 2)..=max_edges);

        Ok((node_count, edge_count))
    }

    pub async fn generate_graph(&self, rng: &mut SmallRng) -> Result<Graph> {
        let (num_nodes, num_edges) = self.calculate_graph_size(rng).await?;
        let mut hamiltonian_cycle: Vec<u8> = (0..num_nodes).collect();

        // Randomize the answer
        hamiltonian_cycle.shuffle(rng);

        let mut edges = Vec::<Edge>::with_capacity(num_edges as usize);
        let mut edge_set: std::collections::HashSet<(u8, u8)> = std::collections::HashSet::new();

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

        let score_increase = 250000 * (graph.num_nodes as u32) / answer.time_ms.max(1);

        self.graph_repository.update_graph(&graph).await?;
        self.user_repository.update_rating(score_increase).await?;

        Ok(graph)
    }

    pub async fn verify_answer(&self, graph: &Graph, path: &[u8]) -> Result<bool> {
        let visited_nodes = path.iter().cloned().collect::<HashSet<u8>>();

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
            .collect::<HashSet<(u8, u8)>>();

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

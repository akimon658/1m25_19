use anyhow::{Result, anyhow};
use model::graph::{Edge, Graph};
use rand::SeedableRng;
use rand::seq::{IndexedRandom, SliceRandom};

pub struct GraphService {
    pub repository: repository::graph::GraphRepository,
}

impl GraphService {
    pub async fn generate_graph(&self, num_nodes: u8, num_edges: u8) -> Result<Graph> {
        if num_edges < num_nodes {
            return Err(anyhow!(
                "the number of edges must be at least equal to the number of nodes."
            ));
        }

        if num_edges > num_nodes * (num_nodes - 1) / 2 {
            return Err(anyhow!(
                "the number of edges must not exceed the maximum possible edges."
            ));
        }

        let mut hamiltonian_cycle: Vec<u8> = (0..num_nodes).collect();
        let mut rng = rand::rngs::SmallRng::from_rng(&mut rand::rng());

        // Randomize the answer
        hamiltonian_cycle.shuffle(&mut rng);

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
            .choose_multiple(&mut rng, (num_edges - num_nodes) as usize)
            .cloned()
            .collect::<Vec<Edge>>();

        edges.extend(sampled_edges);
        // Shuffle the edges to ensure randomness
        edges.shuffle(&mut rng);

        let mut graph = Graph {
            id: 0, // ID will be returned by the repository
            num_nodes,
            edges,
            best_time_ms: None,
            cycle_found: false,
        };

        graph.id = self.repository.save_graph(&graph).await?;

        Ok(graph)
    }

    pub async fn get_graphs(&self) -> Result<Vec<model::graph::GraphMetadata>> {
        self.repository.get_graphs().await
    }
}

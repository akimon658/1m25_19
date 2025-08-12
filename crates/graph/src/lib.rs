use rand::seq::SliceRandom;
use rand::{Rng, SeedableRng};

pub struct GraphService {
    pub repository: repository::graph::GraphRepository,
}

impl GraphService {
    pub async fn generate_graph(
        &self,
        num_nodes: u8,
        num_edges: u8,
    ) -> anyhow::Result<model::graph::Graph> {
        if num_edges < num_nodes {
            return Err(anyhow::anyhow!(
                "the number of edges must be at least equal to the number of nodes."
            ));
        }

        if num_edges > num_nodes * (num_nodes - 1) / 2 {
            return Err(anyhow::anyhow!(
                "the number of edges must not exceed the maximum possible edges."
            ));
        }

        let mut hamiltonian_cycle: Vec<u8> = (0..num_nodes).collect();
        let mut rng = rand::rngs::SmallRng::from_rng(&mut rand::rng());

        // Randomize the answer
        hamiltonian_cycle.shuffle(&mut rng);

        let mut edges: Vec<model::graph::Edge> = Vec::with_capacity(num_edges as usize);
        let mut edge_set: std::collections::HashSet<(u8, u8)> = std::collections::HashSet::new();

        // Create a Hamiltonian cycle
        for i in 0..num_nodes {
            let source = hamiltonian_cycle[i as usize];
            let target = hamiltonian_cycle[((i + 1) % num_nodes) as usize];

            edges.push(model::graph::Edge { source, target });
            edge_set.insert((source.min(target), source.max(target)));
        }

        // Add additional edges
        let num_additional_edges = num_edges - num_nodes;

        for _ in 0..num_additional_edges {
            let mut source: u8;
            let mut target: u8;

            loop {
                source = rng.random_range(0..num_nodes);
                target = rng.random_range(0..num_nodes);

                if source != target && !edge_set.contains(&(source.min(target), source.max(target)))
                {
                    edge_set.insert((source.min(target), source.max(target)));
                    break;
                }
            }

            edges.push(model::graph::Edge { source, target });
        }

        let mut graph = model::graph::Graph {
            id: 0, // ID will be returned by the repository
            num_nodes,
            edges,
        };

        graph.id = self.repository.save_graph(&graph).await?;

        Ok(graph)
    }
}

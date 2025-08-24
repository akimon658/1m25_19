use anyhow::Result;
use model::graph::Graph;

pub struct GraphRepository {
    pub pool: sqlx::SqlitePool,
}

struct DbGraph {
    id: i64,
    num_nodes: i64,
    edges_json: String,
    best_time_ms: Option<i64>,
    cycle_found: bool,
}

impl GraphRepository {
    pub async fn get_graphs(&self) -> Result<Vec<Graph>> {
        let db_graphs = sqlx::query_as!(
            DbGraph,
            "SELECT id, num_nodes, edges_json, best_time_ms, cycle_found FROM graphs"
        )
        .fetch_all(&self.pool)
        .await?;

        let graphs = db_graphs
            .into_iter()
            .map(|db_graph| -> Result<Graph> {
                let graph = Graph {
                    id: db_graph.id,
                    num_nodes: db_graph.num_nodes as u8,
                    edges: serde_json::from_str(&db_graph.edges_json)?,
                    best_time_ms: match db_graph.best_time_ms {
                        Some(ms) => Some(ms as u32),
                        _ => None,
                    },
                    cycle_found: db_graph.cycle_found,
                };

                Ok(graph)
            })
            .collect::<Result<Vec<Graph>>>()?;

        Ok(graphs)
    }

    pub async fn save_graph(&self, graph: &Graph) -> Result<i64> {
        let edges_json = serde_json::to_string(&graph.edges)?;
        let result = sqlx::query!(
            "INSERT INTO graphs (num_nodes, edges_json) VALUES (?, ?)",
            graph.num_nodes,
            edges_json,
        )
        .execute(&self.pool)
        .await?;

        Ok(result.last_insert_rowid())
    }
}

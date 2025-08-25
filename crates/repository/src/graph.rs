use anyhow::Result;
use model::graph::{Graph, GraphMetadata};

pub struct GraphRepository {
    pub pool: sqlx::SqlitePool,
}

impl GraphRepository {
    pub async fn get_graphs(&self) -> Result<Vec<GraphMetadata>> {
        let graphs = sqlx::query_as!(
            GraphMetadata,
            r#"SELECT id, best_time_ms as "best_time_ms: u32", cycle_found FROM graphs"#
        )
        .fetch_all(&self.pool)
        .await?;

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

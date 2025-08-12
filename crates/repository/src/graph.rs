pub struct GraphRepository {
    pub pool: sqlx::SqlitePool,
}

impl GraphRepository {
    pub async fn save_graph(&self, graph: &model::graph::Graph) -> anyhow::Result<i64> {
        let nodes_json = serde_json::to_string(&graph.nodes)?;
        let edges_json = serde_json::to_string(&graph.edges)?;
        let result = sqlx::query!(
            "INSERT INTO graphs (nodes_json, edges_json) VALUES (?, ?)",
            nodes_json,
            edges_json,
        )
        .execute(&self.pool)
        .await?;

        Ok(result.last_insert_rowid())
    }
}

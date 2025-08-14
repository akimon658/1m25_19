pub struct GraphRepository {
    pub pool: sqlx::SqlitePool,
}

impl GraphRepository {
    pub async fn save_graph(&self, graph: &model::graph::Graph) -> anyhow::Result<i64> {
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

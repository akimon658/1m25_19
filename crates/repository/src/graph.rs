pub struct GraphRepository {
    pub pool: sqlx::SqlitePool,
}

impl GraphRepository {
    pub async fn save_graph(&self, graph: &model::graph::Graph) -> anyhow::Result<i64> {
        let result = sqlx::query!(
            "INSERT INTO graphs (nodes_json, edges_json) VALUES (?, ?)",
            graph.nodes,
            graph.edges,
        )
        .execute(&self.pool)
        .await?;

        Ok(result.last_insert_rowid())
    }
}

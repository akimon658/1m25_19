use anyhow::Result;
use model::graph::{Graph, GraphMetadata};

pub struct GraphRepository {
    pub pool: sqlx::SqlitePool,
}

struct DbGraph {
    id: i64,
    num_nodes: u8,
    edges_json: String,
    best_time_ms: Option<u32>,
    cycle_found: bool,
}

impl GraphRepository {
    pub async fn get_graph(&self, graph_id: i64) -> Result<Graph> {
        let db_graph = sqlx::query_as!(
            DbGraph,
            r#"SELECT id, num_nodes as "num_nodes: u8", edges_json, best_time_ms as "best_time_ms: u32", cycle_found FROM graphs WHERE id = ?"#,
            graph_id
        )
        .fetch_one(&self.pool)
        .await?;

        let edges: Vec<model::graph::Edge> = serde_json::from_str(&db_graph.edges_json)?;
        let graph = Graph {
            id: db_graph.id,
            num_nodes: db_graph.num_nodes,
            edges,
            best_time_ms: db_graph.best_time_ms,
            cycle_found: db_graph.cycle_found,
        };

        Ok(graph)
    }

    pub async fn get_graphs(&self) -> Result<Vec<GraphMetadata>> {
        let graphs = sqlx::query_as!(
            GraphMetadata,
            r#"SELECT id, best_time_ms as "best_time_ms: u32", cycle_found FROM graphs"#
        )
        .fetch_all(&self.pool)
        .await?;

        Ok(graphs)
    }

    pub async fn create_graph(&self, graph: &Graph) -> Result<i64> {
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

    pub async fn update_graph(&self, graph: &Graph) -> Result<()> {
        sqlx::query!(
            "UPDATE graphs SET best_time_ms = ?, cycle_found = ? WHERE id = ?",
            graph.best_time_ms,
            graph.cycle_found,
            graph.id,
        )
        .execute(&self.pool)
        .await?;

        Ok(())
    }
}

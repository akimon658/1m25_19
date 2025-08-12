use sqlx::types::Json;

#[derive(serde::Serialize)]
pub struct Node {
    pub id: u8,
}

#[derive(serde::Serialize)]
pub struct Edge {
    pub source: u8,
    pub target: u8,
}

#[derive(serde::Serialize)]
pub struct Graph {
    pub id: i64,
    pub nodes: Json<Vec<Node>>,
    pub edges: Json<Vec<Edge>>,
}

#[derive(serde::Serialize, specta::Type)]
pub struct Node {
    pub id: u8,
}

#[derive(serde::Serialize, specta::Type)]
pub struct Edge {
    pub source: u8,
    pub target: u8,
}

#[derive(serde::Serialize, specta::Type)]
pub struct Graph {
    pub id: i64,
    pub nodes: Vec<Node>,
    pub edges: Vec<Edge>,
}

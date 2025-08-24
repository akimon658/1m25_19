#[derive(Clone, serde::Deserialize, serde::Serialize, specta::Type)]
pub struct Edge {
    pub source: u8,
    pub target: u8,
}

#[derive(serde::Serialize, specta::Type)]
pub struct Graph {
    pub id: i64,
    pub num_nodes: u8,
    pub edges: Vec<Edge>,
    pub best_time_ms: Option<u32>,
    pub cycle_found: bool,
}

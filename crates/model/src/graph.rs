use serde::Deserialize;
use specta::Type;

#[derive(Deserialize, Type)]
pub struct Answer {
    pub path: Vec<u32>,
    pub time_ms: u32,
}

#[derive(Clone, Deserialize, serde::Serialize, Type)]
pub struct Edge {
    pub source: u32,
    pub target: u32,
}

#[derive(serde::Serialize, Type)]
pub struct Graph {
    pub id: i64,
    pub num_nodes: u32,
    pub edges: Vec<Edge>,
    pub best_time_ms: Option<u32>,
    pub cycle_found: bool,
}

#[derive(serde::Serialize, Type)]
pub struct GraphMetadata {
    pub id: i64,
    pub best_time_ms: Option<u32>,
    pub cycle_found: bool,
}

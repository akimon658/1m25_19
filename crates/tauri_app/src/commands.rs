use model::graph::Graph;
use rand::{SeedableRng, rngs::SmallRng};

#[tauri::command]
#[specta::specta]
pub async fn generate_graph(state: tauri::State<'_, crate::AppState>) -> Result<Graph, String> {
    let service = &state.graph_service;
    let mut rng = SmallRng::from_rng(&mut rand::rng());

    service
        .generate_graph(&mut rng)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
#[specta::specta]
pub async fn get_graph(
    state: tauri::State<'_, crate::AppState>,
    graph_id: i64,
) -> Result<Graph, String> {
    let service = &state.graph_service;

    service.get_graph(graph_id).await.map_err(|e| e.to_string())
}

#[tauri::command]
#[specta::specta]
pub async fn get_graphs(
    state: tauri::State<'_, crate::AppState>,
) -> Result<Vec<model::graph::GraphMetadata>, String> {
    let service = &state.graph_service;

    service.get_graphs().await.map_err(|e| e.to_string())
}

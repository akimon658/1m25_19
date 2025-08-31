use model::graph::{Answer, Graph};
use rand::{SeedableRng, rngs::SmallRng};
use tauri::State;

use crate::AppState;

#[tauri::command]
#[specta::specta]
pub async fn generate_graph(state: State<'_, AppState>) -> Result<Graph, String> {
    let service = &state.graph_service;
    let mut rng = SmallRng::from_rng(&mut rand::rng());

    service
        .generate_graph(&mut rng)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
#[specta::specta]
pub async fn get_graph(state: State<'_, AppState>, graph_id: i64) -> Result<Graph, String> {
    let service = &state.graph_service;

    service.get_graph(graph_id).await.map_err(|e| e.to_string())
}

#[tauri::command]
#[specta::specta]
pub async fn get_graphs(
    state: State<'_, AppState>,
) -> Result<Vec<model::graph::GraphMetadata>, String> {
    let service = &state.graph_service;

    service.get_graphs().await.map_err(|e| e.to_string())
}

#[tauri::command]
#[specta::specta]
pub async fn submit_answer(
    state: State<'_, AppState>,
    graph_id: i64,
    answer: Answer,
) -> Result<Graph, String> {
    let service = &state.graph_service;

    service
        .handle_submission(graph_id, &answer)
        .await
        .map_err(|e| e.to_string())
}

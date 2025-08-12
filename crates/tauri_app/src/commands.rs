#[tauri::command]
#[specta::specta]
pub async fn generate_graph(
    state: tauri::State<'_, crate::AppState>,
) -> Result<model::graph::Graph, String> {
    let service = &state.graph_service;

    service
        .generate_graph(10, 15)
        .await
        .map_err(|e| e.to_string())
}

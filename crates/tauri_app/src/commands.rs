use model::graph::Graph;

#[tauri::command]
#[specta::specta]
pub async fn generate_graph(state: tauri::State<'_, crate::AppState>) -> Result<Graph, String> {
    let service = &state.graph_service;

    service
        .generate_graph(10, 15)
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

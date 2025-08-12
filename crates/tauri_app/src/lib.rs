#[cfg(debug_assertions)]
use tauri::Manager;

mod commands;

struct AppState {
    graph_service: graph::GraphService,
}

pub fn run() -> anyhow::Result<()> {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            match app.get_webview_window("main") {
                Some(window) => {
                    window.open_devtools();
                }
                None => {
                    eprintln!("Main window not found, cannot open devtools.");
                }
            }

            tauri::async_runtime::block_on(async || -> anyhow::Result<()> {
                let sqlite_file_path = if cfg!(debug_assertions) {
                    std::env::current_dir()?.join("../../data")
                } else {
                    app.path().data_dir()?
                }
                .join("db.sqlite");

                let repository = repository::Repository::new(&sqlite_file_path).await?;
                let graph_service = graph::GraphService {
                    repository: repository.graph,
                };

                app.manage(AppState { graph_service });

                Ok(())
            }())?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![commands::generate_graph])
        .run(tauri::generate_context!())?;

    Ok(())
}

mod commands;

use crate::commands::{generate_graph, get_graph, get_graphs, submit_answer, synth};
#[cfg(debug_assertions)]
use tauri::Manager;

struct AppState {
    graph_service: graph::GraphService,
}

pub fn run() -> anyhow::Result<()> {
    let specta_builder = tauri_specta::Builder::<tauri::Wry>::new()
        .commands(tauri_specta::collect_commands![
            generate_graph,
            get_graph,
            get_graphs,
            submit_answer,
            synth,
        ])
        .typ::<model::graph::Graph>()
        .error_handling(tauri_specta::ErrorHandlingMode::Throw);

    specta_builder.export(
        specta_typescript::Typescript::default()
            .bigint(specta_typescript::BigIntExportBehavior::Number),
        "../../packages/ui/api/bindings.gen.ts",
    )?;

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
                    graph_repository: repository.graph,
                    user_repository: repository.user,
                };

                app.manage(AppState { graph_service });

                Ok(())
            }())?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            generate_graph,
            get_graph,
            get_graphs,
            submit_answer,
            synth,
        ])
        .run(tauri::generate_context!())?;

    Ok(())
}

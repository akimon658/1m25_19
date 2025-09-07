mod commands;

use crate::commands::{generate_graph, get_graph, get_graphs, submit_answer, synth};
use anyhow::Context;
use std::fs;
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

    #[cfg(debug_assertions)]
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
                log::info!("Setting up the application...");

                let data_dir = if cfg!(debug_assertions) {
                    std::env::current_dir()?.join("../../data")
                } else {
                    app.path().data_dir()?.join("dev.akimo.pathfinder")
                };

                log::info!("Data directory: {:?}", data_dir);
                // データディレクトリが存在しない場合は作成する
                fs::create_dir_all(&data_dir).with_context(|| {
                    log::error!("Failed to create data directory: {:?}", data_dir);
                    format!("Failed to create data directory: {:?}", data_dir)
                })?;

                let sqlite_file_path = data_dir.join("db.sqlite");

                // SQLiteファイルが存在しない場合は空のファイルを作成する

                if !sqlite_file_path.exists() {
                    fs::File::create(&sqlite_file_path).with_context(|| {
                        log::error!("Failed to create SQLite file: {:?}", sqlite_file_path);
                        format!("Failed to create SQLite file: {:?}", sqlite_file_path)
                    })?;
                }

                let repository = match repository::Repository::new(&sqlite_file_path).await {
                    Ok(repo) => repo,
                    Err(e) => {
                        log::error!("Failed to initialize repository: {:?}", e);
                        return Err(anyhow::anyhow!("Failed to initialize repository: {:?}", e));
                    }
                };
                let graph_service = graph::GraphService {
                    graph_repository: repository.graph,
                    user_repository: repository.user,
                };

                app.manage(AppState { graph_service });
                log::info!("Application setup complete.");

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
        .plugin(tauri_plugin_log::Builder::new().build())
        .run(tauri::generate_context!())?;

    Ok(())
}

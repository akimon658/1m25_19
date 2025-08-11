#[cfg(debug_assertions)]
use tauri::Manager;

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

            Ok(())
        })
        .run(tauri::generate_context!())?;

    Ok(())
}

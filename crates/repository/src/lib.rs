use anyhow::Context;

pub mod graph;

pub struct Repository {
    pub graph: graph::GraphRepository,
}

impl Repository {
    pub async fn new(sqlite_file_path: &std::path::Path) -> anyhow::Result<Self> {
        let database_url = "sqlite://".to_string()
            + sqlite_file_path
                .to_str()
                .ok_or(anyhow::anyhow!("convert database path to string"))?;
        let pool = sqlx::SqlitePool::connect(&database_url)
            .await
            .with_context(|| format!("connect to database at {}", sqlite_file_path.display()))?;

        sqlx::migrate!().run(&pool).await?;

        Ok(Self {
            graph: graph::GraphRepository { pool },
        })
    }
}

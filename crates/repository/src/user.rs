use anyhow::Result;
use model::user::User;

pub struct UserRepository {
    pub pool: sqlx::SqlitePool,
}

impl UserRepository {
    pub async fn get_user(&self) -> Result<User> {
        let user = sqlx::query_as!(User, "SELECT id, rating FROM users")
            .fetch_one(&self.pool)
            .await?;

        Ok(user)
    }
}

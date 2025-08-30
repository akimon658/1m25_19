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

    pub async fn update_rating<T: Into<i64>>(&self, diff: T) -> Result<()> {
        let diff = diff.into();

        sqlx::query!("UPDATE users SET rating = rating + ? WHERE id = 1", diff)
            .execute(&self.pool)
            .await?;

        Ok(())
    }
}

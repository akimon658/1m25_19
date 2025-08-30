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
        let diff_i64: i64 = diff.into();

        sqlx::query!(
            "UPDATE users SET rating = CASE WHEN rating + ? > 0 THEN rating + ? ELSE 0 END WHERE id = 1",
            diff_i64,
            diff_i64
        )
        .execute(&self.pool)
        .await?;

        Ok(())
    }
}

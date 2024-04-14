use std::sync::Arc;

use async_trait::async_trait;

pub struct User {
    pub id: u32,
    pub username: String,
    pub hash: String,
    pub salt: String,
}

impl User {
    pub fn validate_password(&self, password: &str) -> bool {
        todo!();
    }
}

#[derive(Clone)]
pub struct UserService {
    pub hasher: Arc<dyn PasswordHashingService>,
    pub repo: Arc<dyn UserRepository>,
}

pub trait PasswordHashingService: Send + Sync {
    fn hash(&self, password: &str) -> String;
}

#[async_trait]
pub trait UserRepository: Send + Sync {
    async fn get(&self, id: u64) -> Option<User>;
    async fn create(&self, user: User) -> Result<(), ()>;
}

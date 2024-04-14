use async_trait::async_trait;

pub struct Session {
    pub id: u64,
}

#[async_trait]
pub trait SessionRepository {
    async fn get(&mut self, session: Session);
}

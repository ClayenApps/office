use async_trait::async_trait;

pub struct Document {
    id: u32,
    pub metadata: DocumentMetadata,
    pub content: DocumentContent,
}

pub struct DocumentMetadata;
pub struct DocumentContent(String);

#[async_trait]
pub trait DocumentRepo: Send + Sync {
    async fn get(&self, id: u64) -> Option<Document>;
}

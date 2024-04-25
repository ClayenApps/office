use axum::{
    extract::Path, routing::{get, post}, Router
};

pub fn router() -> Router {
    Router::new().route("/", post(post_document)).route(
        "/:id",
        get(get_document).put(put_document).delete(delete_document),
    )
}

async fn get_document(Path(id): Path<u32>) {}

async fn post_document() {}

async fn put_document(Path(id): Path<u32>) {}

async fn delete_document(Path(id): Path<u32>) {}

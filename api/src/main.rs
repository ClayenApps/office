mod domain;
mod infra;
pub mod application;

use std::sync::Arc;

use anyhow::anyhow;
use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use domain::user::{User, UserRepository};
use infra::DbRepository;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let db_repository = DbRepository::new();
    let user_repository = db_repository.clone();

    let state = AppState {
        user_repository: Box::new(db_repository),
    };

    let app = Router::new()
        .route("/", get(root))
        // .route("/users", post(create_user))
        .with_state(Arc::new(state));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

pub struct AppState {
    user_repository: Box<dyn UserRepository>,
}

impl AppState {
    pub fn new(db_repository: DbRepository) {
        let db_rep = Arc::new(db_repository);
    }
}

async fn root() -> &'static str {
    "Hello, World!"
}

// async fn create_user(
//     Json(payload): Json<CreateUser>,
// ) -> Result<(StatusCode, Json<User>), AppError> {
    

//     Ok((StatusCode::CREATED, Json())
// }

struct CreateUser {
    username: String,
    password: String,
}

struct AppError(anyhow::Error);

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Something went wrong: {}", self.0),
        )
            .into_response()
    }
}

impl<E> From<E> for AppError
where
    E: Into<anyhow::Error>,
{
    fn from(err: E) -> Self {
        Self(err.into())
    }
}

use axum::Router;

mod user;
mod document;
mod form;

pub fn router() -> Router {
    Router::new()
        .nest("/user", user::router())
        .nest("/document", document::router())
        .nest("/form", form::router())
}

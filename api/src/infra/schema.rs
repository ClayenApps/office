// @generated automatically by Diesel CLI.

diesel::table! {
    users (id) {
        id -> Int4,
        #[max_length = 100]
        username -> Varchar,
        #[max_length = 255]
        password_hash -> Varchar,
        #[max_length = 255]
        password_salt -> Varchar,
    }
}

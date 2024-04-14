use async_trait::async_trait;
use diesel::{
    deserialize::Queryable, query_dsl::methods::SelectDsl, OptionalExtension, RunQueryDsl,
    Selectable, SelectableHelper,
};

use crate::domain::user::{User, UserRepository};

use super::DbRepository;

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::infra::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
struct UserDTO {
    id: i32,
    username: String,
    password_hash: String,
    password_salt: String,
}

impl From<UserDTO> for User {
    fn from(dto: UserDTO) -> Self {
        User {
            id: dto.id as u32,
            username: dto.username,
            hash: dto.password_hash,
            salt: dto.password_salt,
        }
    }
}

#[async_trait]
impl UserRepository for DbRepository {
    async fn get(&self, id: u64) -> Option<User> {
        use crate::infra::schema::users::dsl::users;

        let pool = self.conn_pool.clone();

        tokio::task::spawn_blocking(|| {
            users
                .select(UserDTO::as_select())
                .first(&mut pool.get().unwrap())
                .optional()
                .unwrap()
                .map(User::from)
        })
        .await
        .unwrap()
    }
}

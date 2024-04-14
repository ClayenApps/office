pub mod password_hash {
    use crate::domain::user::PasswordHashingService;
    use argon2::{
        password_hash::{rand_core::OsRng, PasswordHasher, SaltString},
        Argon2,
    };

    pub struct Argon2PasswordHasher(Argon2<'static>);

    impl Argon2PasswordHasher {
        pub fn new() -> Self {
            Self(Argon2::default())
        }
    }

    impl PasswordHashingService for Argon2PasswordHasher {
        fn hash(&self, password: &str) -> String {
            let salt = SaltString::generate(&mut OsRng);
            let hash = self.0
                .hash_password(password.as_bytes(), salt)
                .map(|hash| hash.serialize().to_string())
                .unwrap();
            hash
        }
    }
}

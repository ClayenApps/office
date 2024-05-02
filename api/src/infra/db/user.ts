import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { CredentialsHashed, User, UserRepository } from "../../domain/user/user.js";
import { RepositoryORM } from "./orm.js";
import { EmailCodeRepository } from "../../domain/user/email.js";

export class UserRepositoryDb extends RepositoryORM implements UserRepository {
    async get(): Promise<User> {
        return new User(1, "Cat", "test@example.com");
    }
    async create(user: CredentialsHashed): Promise<User> {
        const { name, email, password_hash: _ } = user;
        return new User(1, name, email);
    }
    async isVacant(email: string, name: string): Promise<boolean> {
        return true;
    }
}

export class EmailCodeRepositoryDb extends RepositoryORM implements EmailCodeRepository {
    async isEmailConfirmed(user: User): Promise<boolean> {
        return false;
    }
    async isValid(user: User, code: string): Promise<boolean> {
        return true;
    }
    async set(user: User, code: string): Promise<void> {}
    async reset(user: User): Promise<void> {}
}

@Entity({ tableName: "user" })
export class UserEntity {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    email!: string;

    @Property()
    emailCodePending?: string;

    @Property()
    password!: string;
}

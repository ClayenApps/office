import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { CredentialsHashed, User, UserRepository } from "../../domain/user/user.js";
import { RepositoryORM } from "./orm.js";
import { EmailCodeRepository } from "../../domain/user/email.js";
import { randomInt } from "crypto";
import { Session, SessionRepository } from "../../domain/user/session.js";

export class UserRepositoryDb extends RepositoryORM implements UserRepository {
    private source: User[] = [];

    async get(id: number): Promise<User | null> {
        return this.source.find(x => x.id == id) ?? null;
    }
    async getByEmail(email: string): Promise<User | null> {
        return this.source.find(x => x.email == email) ?? null;
    }
    async create(credentials: CredentialsHashed): Promise<User> {
        const { name, email, password_hash } = credentials;
        const user = new User(randomInt(0, 999999999999), name, email, password_hash);
        this.source.push(user);
        return user;
    }
    async isVacant(email: string, name: string): Promise<boolean> {
        return this.source.find(x => x.email === email || x.name === name) === undefined;
    }
}

export class EmailCodeRepositoryDb extends RepositoryORM implements EmailCodeRepository {
    private source: { user: User; code: string }[] = [];

    async isEmailConfirmed(user: User): Promise<boolean> {
        return this.source.find(x => x.user.id === user.id) === undefined;
    }
    async isValid(user: User, code: string): Promise<boolean> {
        return this.source.find(x => x.user.id === user.id)?.code === code;
    }
    async set(user: User, code: string): Promise<void> {
        let obj = this.source.find(x => x.user.id === user.id);
        if (obj === undefined) this.source.push({ user, code });
        else obj.code = code;
    }
    async reset(user: User): Promise<void> {
        let index = this.source.findIndex(x => x.user.id === user.id);
        this.source.splice(index, 1);
    }
}

export class SessionRepositoryDb extends RepositoryORM implements SessionRepository {
    private source: Session[] = [];

    async isValid(session: Session): Promise<boolean> {
        return this.source.find(x => x.user.id === session.id) !== undefined;
    }
    async getAll(user: User): Promise<Session[]> {
        return this.source.filter(x => x.id === user.id);
    }
    async create(user: User): Promise<Session> {
        let session = new Session(randomInt(0, 9999999999), user);
        this.source.push(session);
        return session;
    }
    async delete(id: number): Promise<void> {
        let index = this.source.findIndex(x => x.id === id);
        this.source.splice(index, 1);
    }
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

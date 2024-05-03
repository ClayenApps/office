import { randomInt } from "crypto";
import PasswordService from "../password.js";
import { EmailValidationService } from "./email.js";
import { Session, SessionRepository } from "./session.js";

export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public passwordHash: string
    ) {}
}

export class UserService {
    constructor(
        private emailValidationService: EmailValidationService,
        private passwordService: PasswordService,
        private repository: UserRepository,
        private sessionRepo: SessionRepository
    ) {}

    public async register(
        email: string,
        name: string,
        password: string
    ): Promise<User | "occupied"> {
        if (!(await this.repository.isVacant(email, name))) {
            return "occupied";
        }
        let password_hash = await this.passwordService.hash(password);
        const user = await this.repository.create({
            email,
            name,
            password_hash
        });
        this.emailValidationService.request(user, email);
        return user;
    }

    public async login(email: string, password: string): Promise<Session | null> {
        let user = await this.repository.getByEmail(email);
        if (user === null) return null;
        let valid = await this.passwordService.verify(password, user.passwordHash);
        if (!valid) return null;
        return await this.sessionRepo.create(user);
    }
}

export type CredentialsHashed = {
    name: string;
    email: string;
    password_hash: string;
};

export interface UserRepository {
    get(id: number): Promise<User | null>;
    getByEmail(email: string): Promise<User | null>;
    create(credentials: CredentialsHashed): Promise<User>;
    isVacant(email: string, name: string): Promise<boolean>;
}

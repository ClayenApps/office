import PasswordService from "../password.js";
import { EmailValidationService } from "./email.js";

export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string
    ) {}
}

export class UserService {
    constructor(
        private emailValidationService: EmailValidationService,
        private passwordService: PasswordService,
        private repository: UserRepository
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

    public login() {}
}

export type CredentialsHashed = {
    name: string;
    email: string;
    password_hash: string;
};

export interface UserRepository {
    get(id: number): Promise<User>;
    create(user: CredentialsHashed): Promise<User>;
    isVacant(email: string, name: string): Promise<boolean>;
}

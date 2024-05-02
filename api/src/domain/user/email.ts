import { getRandomInt } from "../../util.js";
import EmailService from "../email.js";
import { User } from "./user.js";

export class EmailValidationService {
    constructor(
        private email_service: EmailService,
        private repository: EmailCodeRepository
    ) {}

    public async request(user: User, email: string) {
        let code = getRandomInt(0, 9999);
        let code_str = code.toFixed(0).padStart(6, "0");
        let message = `Your confirmation code is: ${code_str}`;
        await this.repository.set(user, code_str);
        await this.email_service.send(email, "Confirm your email", message);
    }

    public async confirm(user: User, code: string) {
        if (await this.repository.isValid(user, code)) {
            this.repository.reset(user);
        }
    }
}

export interface EmailCodeRepository {
    isEmailConfirmed(user: User): Promise<boolean>;
    isValid(user: User, code: string): Promise<boolean>;
    set(user: User, code: string): Promise<void>;
    reset(user: User): Promise<void>;
}

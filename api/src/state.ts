import { UserRepository, UserService } from "./domain/user/user.js";
import { DocumentRepository } from "./domain/document/document.js";
import { PasswordServiceArgon2 } from "./infra/password.js";
import EmailService from "./domain/email.js";
import { ResendEmailService } from "./infra/resend.js";
import { EmailCodeRepository, EmailValidationService } from "./domain/user/email.js";
import PasswordService from "./domain/password.js";
import { EmailCodeRepositoryDb, SessionRepositoryDb, UserRepositoryDb } from "./infra/db/user.js";
import { DocumentRepositoryDb } from "./infra/db/document.js";
import { initORM } from "./infra/db/orm.js";
import { FastifyPluginAsync } from "fastify";
import { AppOptions } from "./app.js";
import { SessionRepository } from "./domain/user/session.js";

const StatePlugin: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
    const state = await getState();
    fastify.decorate("state", state);
};

export async function getState() {
    const repositories = await getRepositories();
    const services = getServices(repositories);
    return {
        repositories,
        services
    };
}

async function getRepositories() {
    const orm = await initORM();
    const document: DocumentRepository = new DocumentRepositoryDb(orm);
    const user: UserRepository = new UserRepositoryDb(orm);
    const session: SessionRepository = new SessionRepositoryDb(orm);
    const emailValidation: EmailCodeRepository = new EmailCodeRepositoryDb(orm);
    return { document, user, session, emailValidation };
}

function getServices(repositories: Repositories) {
    const email: EmailService = new ResendEmailService(process.env.RESEND_KEY!);
    const emailValidation: EmailValidationService = new EmailValidationService(
        email,
        repositories.emailValidation
    );
    const password: PasswordService = new PasswordServiceArgon2();
    const user: UserService = new UserService(
        emailValidation,
        password,
        repositories.user,
        repositories.session
    );
    return {
        email,
        emailValidation,
        password,
        user
    };
}

export type State = Awaited<ReturnType<typeof getState>>;
type Repositories = Awaited<ReturnType<typeof getRepositories>>;

export default StatePlugin;

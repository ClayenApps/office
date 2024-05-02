import { User } from "./user/user.js";

export class Session {
    constructor(public id: number, public user: User) {}
}

export interface SessionRepository {
    isValid(session: Session): Promise<boolean>;
    getAll(user: User): Promise<Session>;
    create(user: User): Promise<void>;
    delete(id: number): Promise<void>;
}

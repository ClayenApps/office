import { User } from "../user/user.js";
import { Document } from "./document.js";

export interface DocumentAccessRepository {
    get(document: Document, user: User): Promise<AccessLevel>;
    set(document: Document, user: User, level: AccessLevel): Promise<void>;
}

export type AccessLevel = "preview" | "view" | "edit";

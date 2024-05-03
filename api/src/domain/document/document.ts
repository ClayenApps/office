import { User } from "../user/user.js";

export class Document {
    constructor(
        public id: number,
        public metadata: Metadata,
        public content: string
    ) {}
}

export class Metadata {
    constructor(
        public title: string,
        public createdAt: Date,
        public owner: User
    ) {}
}

export interface DocumentRepository {
    get(id: number): Promise<Document | null>;
    create(document: Omit<Document, "id">): Promise<void>;
    update(document: Document): Promise<void>;
    delete(id: number): Promise<void>;
}

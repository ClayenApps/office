import { Document, DocumentRepository } from "../../domain/document.js";
import { RepositoryORM } from "./orm.js";

export class DocumentRepositoryDb extends RepositoryORM implements DocumentRepository {
    async get(id: number): Promise<Document> {
        throw new Error("Method not implemented.");
    }
    async create(document: Omit<Document, "id">): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async update(document: Document): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

import { randomInt } from "crypto";
import { Document, DocumentRepository } from "../../domain/document/document.js";
import { RepositoryORM } from "./orm.js";

export class DocumentRepositoryDb extends RepositoryORM implements DocumentRepository {
    private source: Document[] = [];

    async get(id: number): Promise<Document | null> {
        return this.source.find(x => x.id == id) ?? null;
    }
    async create(document: Omit<Document, "id">): Promise<void> {
        this.source.push({ ...document, id: randomInt(0, 999999999999) });
    }
    async update(document: Document): Promise<void> {
        let target = this.source.find(x => x.id == document.id);
        if (target) {
            target.metadata = document.metadata;
            target.content = document.content;
        }
    }
    async delete(id: number): Promise<void> {
        let index = this.source.findIndex(x => x.id === id);
        this.source.splice(index, 1)
    }
}

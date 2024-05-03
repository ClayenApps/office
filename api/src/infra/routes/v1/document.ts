import { Static, Type } from "@sinclair/typebox";
import { FastifyPluginAsync } from "fastify";

const DocumentPlugin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post(
        "/",
        {
            schema: {
                description: "Creates new document",
                tags: ["documents"],
                params: IdParams,
                body: CreateDocumentMetadata,
                response: { 201: Document }
            }
        },
        async function (request, reply) {}
    );
    fastify.get<{ Params: IdParams }>(
        "/:id",
        {
            schema: {
                description: "Gets metadata and body of the document",
                tags: ["documents"],
                params: IdParams,
                response: { 200: Document }
            }
        },
        async function (request, reply) {
            const { id } = request.params;
            return reply.send(id);
        }
    );
    fastify.get<{ Params: IdParams }>(
        "/:id/metadata",
        {
            schema: {
                description: "Gets metadata of the document",
                tags: ["documents"],
                params: IdParams,
                response: { 200: DocumentMetadata }
            }
        },
        async function (request, reply) {
            const { id } = request.params;
            return reply.send(id);
        }
    );
    fastify.get<{ Params: IdParams }>(
        "/:id/body",
        {
            schema: {
                description: "Gets body of the document",
                tags: ["documents"],
                params: IdParams,
                response: { 200: DocumentBody }
            }
        },
        async function (request, reply) {
            const { id } = request.params;
            return reply.send(id);
        }
    );
    fastify.put<{ Params: IdParams; Body: Title }>(
        "/:id/title",
        {
            schema: {
                description: "Renames the document",
                tags: ["documents"],
                params: IdParams,
                body: Title
            }
        },
        async function (request, reply) {
            const { id } = request.params;
            return reply.send(id);
        }
    );
    fastify.put<{ Params: IdParams }>(
        "/:id/body",
        {
            schema: {
                description: "Updates document content",
                tags: ["documents"],
                params: IdParams
            }
        },
        async function (request, reply) {
            const { id } = request.params;
            return reply.send(id);
        }
    );
    fastify.delete<{ Params: IdParams }>(
        "/:id",
        { schema: { description: "Deletes the document", tags: ["documents"], params: IdParams } },
        async function (request, reply) {
            const { id } = request.params;
            return reply.send(id);
        }
    );
    // fastify.post("/")
};

const IdParams = Type.Object({ id: Type.Integer({ minimum: 0 }) });
type IdParams = Static<typeof IdParams>;

const Title = Type.String({ maxLength: 255 });
type Title = Static<typeof Title>;

const DocumentMetadata = Type.Object({
    title: Title,
    createdAt: Type.String({ format: "date" })
});
type DocumentMetadata = Static<typeof DocumentMetadata>;

const CreateDocumentMetadata = Type.Object({
    title: Type.String({ maxLength: 255 })
});
type CreateDocumentMetadata = Static<typeof CreateDocumentMetadata>;

const DocumentBody = Type.String();
type DocumentBody = Static<typeof DocumentBody>;

const Document = Type.Object({
    metadata: DocumentMetadata,
    body: DocumentBody
});
type Document = Static<typeof Document>;

export default DocumentPlugin;

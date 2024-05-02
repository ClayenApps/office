import { Static, Type } from "@sinclair/typebox";
import { FastifyPluginAsync } from "fastify";

const DocumentPlugin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post(
        "/",
        { schema: { tags: ["documents"], params: IdParams } },
        async function (request, reply) {}
    );
    fastify.get<{ Params: IdParams }>(
        "/:id",
        { schema: { tags: ["documents"], params: IdParams } },
        async function (request, reply) {
            const { id } = request.params;
            return reply.send(id);
        }
    );
    fastify.put<{ Params: IdParams }>(
        "/:id/name",
        { schema: { tags: ["documents"], params: IdParams } },
        async function (request, reply) {
            const { id } = request.params;
            return reply.send(id);
        }
    );
    fastify.put<{ Params: IdParams }>(
        "/:id/body",
        { schema: { tags: ["documents"], params: IdParams } },
        async function (request, reply) {
            const { id } = request.params;
            return reply.send(id);
        }
    );
    fastify.delete<{ Params: IdParams }>(
        "/:id",
        { schema: { tags: ["documents"], params: IdParams } },
        async function (request, reply) {
            const { id } = request.params;
            return reply.send(id);
        }
    );
    // fastify.post("/")
};

const IdParams = Type.Object({ id: Type.Integer({ minimum: 0 }) });
type IdParams = Static<typeof IdParams>;

const DocumentMetadata = Type.Object({
    title: Type.String({ maxLength: 255 }),
    createdAt: Type.String({ format: "date" })
});
type DocumentMetadata = Static<typeof DocumentMetadata>;

const CreateDocumentMetadata = Type.Object({
    title: Type.String({ maxLength: 255 })
});
type CreateDocumentMetadata = Static<typeof CreateDocumentMetadata>;

const DocumentBody = Type.String();
type DocumentBody = Static<typeof DocumentBody>;

export default DocumentPlugin;

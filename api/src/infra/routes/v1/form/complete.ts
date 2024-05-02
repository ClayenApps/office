import { Static, Type } from "@sinclair/typebox";
import { FastifyPluginAsync } from "fastify";

const tags = ["forms"];

const FormCompletionPlugin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post(
        "/start",
        { schema: { description: "Starts form completion and returns questions. Used to track time limits, etc.", tags, params: IdParams } },
        async function (request, reply) {}
    );
    fastify.post(
        "/backup",
        { schema: { description: "", tags, params: IdParams } },
        async function (request, reply) {}
    );
    fastify.post(
        "/complete",
        { schema: { description: "Finishes form completion", tags, params: IdParams } },
        async function (request, reply) {}
    );
};

const IdParams = Type.Object({ id: Type.Integer({ minimum: 0 }) });
type IdParams = Static<typeof IdParams>;

export default FormCompletionPlugin;

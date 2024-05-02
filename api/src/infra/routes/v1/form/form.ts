import { Static, Type } from "@sinclair/typebox";
import { FastifyPluginAsync } from "fastify";
import FormCompletionPlugin from "./complete.js";
import FormManagementPlugin from "./manage.js";

const tags = ["forms"];

const FormPlugin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get<{ Params: IdParams }>(
        "/:id",
        {
            schema: {
                description: "Gets information about the form (without questions).",
                tags,
                params: IdParams
            }
        },
        async function (request, reply) {
            const { id } = request.params;
            return reply.send(id);
        }
    );
    fastify.post(
        "/:id/start",
        { schema: { description: "Starts form ", tags, params: IdParams } },
        async function (request, reply) {}
    );

    fastify.register(FormCompletionPlugin, { prefix: "/:id/complete" });
    fastify.register(FormManagementPlugin, { prefix: "/:id/manage" });
};

const IdParams = Type.Object({ id: Type.Integer({ minimum: 0 }) });
type IdParams = Static<typeof IdParams>;

export default FormPlugin;

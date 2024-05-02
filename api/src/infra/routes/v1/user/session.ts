import { FastifyPluginAsync } from "fastify";
import { Static, Type } from "@sinclair/typebox";

const tags = ["sessions"];

export const SessionPlugin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post(
        "/",
        {
            schema: {
                description: "Creates new session for the user",
                tags
            }
        },
        async (request, reply) => {
            return reply.code(201).send();
        }
    );
    fastify.get(
        "/",
        {
            schema: {
                description: "Gets all active sessions for the user",
                tags,
                response: {
                    200: SessionInfo
                }
            }
        },
        async (request, reply) => {
            return reply.code(200).send({ token: "1234" });
        }
    );
    fastify.delete<{ Params: IdParams }>(
        "/",
        {
            schema: {
                description: "Deletes all sessions for the user except current.",
                tags
            }
        },
        async (request, reply) => {
            return reply.code(200).send();
        }
    );
    fastify.delete<{ Params: IdParams }>(
        "/:id",
        {
            schema: {
                description: "Deletes provided session for the user.",
                tags,
                params: IdParams
            }
        },
        async (request, reply) => {
            return reply.code(200).send();
        }
    );
};

const IdParams = Type.Object({ id: Type.Integer({ minimum: 0 }) });
type IdParams = Static<typeof IdParams>;

const UserInfo = Type.Object({
    id: Type.Number(),
    email: Type.String({ format: "email" }),
    name: Type.String()
});
type UserInfo = Static<typeof UserInfo>;

const SessionInfo = Type.Object({ user: UserInfo });
type SessionInfo = Static<typeof SessionInfo>;

export default SessionPlugin;

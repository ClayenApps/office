import { FastifyPluginAsync } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import SessionPlugin from "./session.js";
import AccountPlugin from "./account.js";

const tags = ["users"];

const UserPlugin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get<{ Params: IdParams; Reply: UserInfo }>(
        "/:id",
        {
            schema: { tags, params: IdParams }
        },
        async (request, reply) => {
            const { id } = request.params;
            const { email, name } = await fastify.state.repositories.user.get(id);
            return reply.code(200).send({ id, email, name });
        }
    );
    fastify.post<{ Body: CreateUser }>(
        "/",
        {
            schema: {
                tags,
                body: CreateUser,
                response: {
                    201: Type.Null({ description: "Created" }),
                    400: Type.Null({ description: "Username or email is already occupied" })
                }
            }
        },
        async (request, reply) => {
            const { email, name, password } = request.body;
            const user = await fastify.state.services.user.register(email, name, password);
            if (user == "occupied") {
                return reply.code(400).send({ error: "Already occupied" });
            }
            return reply.code(201).send({ id: user.id, email, name });
        }
    );
    fastify.register(AccountPlugin, { prefix: "/:id" });
    fastify.register(SessionPlugin, { prefix: "/:id/sessions" });
};

const IdParams = Type.Object({ id: Type.Integer({ minimum: 0 }) });
type IdParams = Static<typeof IdParams>;

const UserInfo = Type.Object({
    id: Type.Number(),
    email: Type.String({ format: "email" }),
    name: Type.String()
});
type UserInfo = Static<typeof UserInfo>;

const CreateUser = Type.Object({
    email: Type.String({ format: "email" }),
    name: Type.String({ minLength: 4, maxLength: 64 }),
    password: Type.String({ minLength: 6, maxLength: 64 })
});
type CreateUser = Static<typeof CreateUser>;

export default UserPlugin;

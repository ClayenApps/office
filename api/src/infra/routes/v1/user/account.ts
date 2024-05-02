import { FastifyPluginAsync } from "fastify";
import { Static, Type } from "@sinclair/typebox";

const tags = ["account"];

const AccountPlugin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const ChangeProfile = Type.Object({ name: Type.String() });
    type ChangeProfile = Static<typeof ChangeProfile>;
    fastify.put<{ params: IdParams; Body: ChangeProfile }>(
        "/profile",
        {
            schema: {
                description: "Updates user profile information",
                tags,
                params: IdParams,
                body: ChangeProfile,
                response: {
                    200: Type.Null({ description: "Ok" }),
                    400: Type.Null()
                }
            }
        },
        async (request, reply) => {
            return reply.send();
        }
    );

    const UpdateEmail = Type.Object({ email: Type.String({ format: "email" }) });
    type UpdateEmail = Static<typeof UpdateEmail>;
    fastify.post<{ Params: IdParams; Body: UpdateEmail }>(
        "/email",
        {
            schema: {
                description: "Updates user email",
                tags,
                params: IdParams,
                body: UpdateEmail
            }
        },
        async (request, reply) => {
            return reply.send();
        }
    );

    const ConfirmEmail = Type.Object({ code: Type.String() });
    type ConfirmEmail = Static<typeof ConfirmEmail>;
    fastify.post<{ Params: IdParams; Body: ConfirmEmail }>(
        "/email/confirm",
        {
            schema: {
                description: "Confirms user email",
                tags,
                params: IdParams,
                body: ConfirmEmail
            }
        },
        async (request, reply) => {
            return reply.send();
        }
    );

    fastify.post<{ Params: IdParams; Body: ChangePassword }>(
        "/password",
        {
            schema: {
                description: "Changes user password",
                tags,
                params: IdParams,
                body: ConfirmEmail
            }
        },
        async (request, reply) => {
            return reply.send();
        }
    );
};

const IdParams = Type.Object({ id: Type.Integer({ minimum: 0 }) });
type IdParams = Static<typeof IdParams>;

const ChangePassword = Type.Object({ old: Type.String(), new: Type.String() });
type ChangePassword = Static<typeof ChangePassword>;

export default AccountPlugin;

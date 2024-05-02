import { FastifyPluginAsync } from "fastify";
import UserPlugin from "./user/user.js";
import FormPlugin from "./form/form.js";
import DocumentPlugin from "./document.js";
import SwaggerPlugin from "./swagger.js";
import fp from "fastify-plugin";

const V1Plugin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    await fastify.register(fp(SwaggerPlugin));
    await Promise.all([
        fastify.register(UserPlugin, { prefix: "/users" }),
        fastify.register(DocumentPlugin, { prefix: "/documents" }),
        fastify.register(FormPlugin, { prefix: "/forms" })
    ]);
};

export default V1Plugin;

import { FastifyPluginAsync } from "fastify";
import V1Plugin from "./v1/v1.js";

const RoutesPlugin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    await Promise.all([fastify.register(V1Plugin, { prefix: "/v1" })]);
};

export default RoutesPlugin;

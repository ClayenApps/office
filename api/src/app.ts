import * as path from "path";
import { FastifyPluginAsync } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { fileURLToPath } from "url";

import StatePlugin, { getState } from "./state.js";
import RoutesPlugin from "./infra/routes/routes.js";
import fp from "fastify-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type AppOptions = {
    // Place your custom options for app below here.
};

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
    fastify.withTypeProvider<TypeBoxTypeProvider>();
    await fastify.register(fp(StatePlugin));
    await fastify.register(RoutesPlugin);
};

export default app;
export { app, options };

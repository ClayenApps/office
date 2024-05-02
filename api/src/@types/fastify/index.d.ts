import * as fastify from "fastify";
import * as http from "http";

import { State } from "../../state.ts";

declare module "fastify" {
    export interface FastifyInstance {
        state: State;
    }
}

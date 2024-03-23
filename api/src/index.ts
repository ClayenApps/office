import { Elysia } from "elysia";
import bearer from "@elysiajs/bearer";
import { cors } from "@elysiajs/cors";
import { storage, users } from "./routes";

const app = new Elysia()
    .use(cors())
    .use(bearer())

    .use(storage)
    .use(users)
    .get("/", () => "Hello Elysia")

    .listen({
        hostname: "0.0.0.0",
        port: 3000
    });

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

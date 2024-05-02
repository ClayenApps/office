import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { FastifyPluginAsync } from "fastify";

const SwaggerPlugin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    await fastify.register(fastifySwagger, {
        openapi: {
            openapi: "3.0.0",
            info: {
                title: "ClayenOffice API",
                description: "Main ClayenOffice API",
                version: "0.1.0"
            },
            servers: [
                {
                    url: "http://localhost:3000",
                    description: "Development server"
                }
            ],
            tags: [
                { name: "users", description: "User accounts" },
                { name: "account", description: "User account" },
                { name: "sessions", description: "User sessions" },
                { name: "documents", description: "Documents and metadata" },
                { name: "collaboration", description: "Collaborative editing" },
                { name: "docs", description: "Docs service" },
                { name: "slides", description: "Slides service" },
                { name: "forms", description: "Forms service" }
            ],
            components: {
                securitySchemes: {
                    apiKey: {
                        type: "apiKey",
                        name: "apiKey",
                        in: "header"
                    }
                }
            }
        }
    });
    await fastify.register(fastifySwaggerUi, {
        routePrefix: "/docs",
        uiConfig: {
            docExpansion: "list",
            deepLinking: false
        },
        staticCSP: true,
        transformSpecificationClone: true
    });
};

export default SwaggerPlugin;

import Elysia, { t } from "elysia";

export const storage = new Elysia({ prefix: "/storage" })
    .get("/search", ({ query: { name, page } }) => ({ name, page }), {
        query: t.Object({
            name: t.Optional(t.String()),
            page: t.Optional(t.Numeric({ minimum: 0, multipleOf: 1 }))
        })
    })
    .group("/:owner", app =>
        app
            .post("/", () => "Not implemented")
            .group("/:id", app =>
                app
                    .get("/", ({ params: { id, owner } }) => "Not implemented")
                    .put("/", ({ params: { id, owner } }) => "Not implemented")
                    .delete("/", ({ params: { id, owner } }) => "Not implemented")
            )
    );

export const users = new Elysia({ prefix: "/users" }).get("/me", () => "unknown");

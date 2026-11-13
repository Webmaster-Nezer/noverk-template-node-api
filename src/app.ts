import { Hono } from "hono";
import { z } from "zod";

// An example resource kept in memory; swap the store for a database when the app needs one.
export type Todo = { id: number; title: string; done: boolean };
const NewTodo = z.object({ title: z.string().trim().min(1).max(200) });

export function createApp(store: Todo[] = []) {
  const app = new Hono();
  let next = store.reduce((max, todo) => Math.max(max, todo.id), 0) + 1;

  app.get("/health", c => c.json({ ok: true }));
  app.get("/todos", c => c.json(store));
  app.post("/todos", async c => {
    const parsed = NewTodo.safeParse(await c.req.json().catch(() => null));
    if (!parsed.success) return c.json({ error: "Send { title }: 1 to 200 characters." }, 400);
    const todo: Todo = { id: next++, title: parsed.data.title, done: false };
    store.push(todo);
    return c.json(todo, 201);
  });
  app.patch("/todos/:id", async c => {
    const todo = store.find(item => item.id === Number(c.req.param("id")));
    if (!todo) return c.json({ error: "There is no such todo." }, 404);
    const body = await c.req.json().catch(() => null) as { done?: unknown } | null;
    if (typeof body?.done !== "boolean") return c.json({ error: "Send { done: true | false }." }, 400);
    todo.done = body.done;
    return c.json(todo);
  });
  app.notFound(c => c.json({ error: "Not found." }, 404));
  return app;
}

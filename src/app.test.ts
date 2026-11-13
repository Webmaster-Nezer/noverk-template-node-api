import { createApp } from "./app.js";

describe("the API", () => {
  it("answers health", async () => {
    const res = await createApp().request("/health");
    expect(await res.json()).toEqual({ ok: true });
  });
  it("creates, lists and completes todos", async () => {
    const app = createApp();
    const created = await app.request("/todos", { method: "POST", body: JSON.stringify({ title: " Ship it " }), headers: { "content-type": "application/json" } });
    expect(created.status).toBe(201);
    expect(await created.json()).toEqual({ id: 1, title: "Ship it", done: false });
    const done = await app.request("/todos/1", { method: "PATCH", body: JSON.stringify({ done: true }), headers: { "content-type": "application/json" } });
    expect((await done.json()).done).toBe(true);
    expect(await (await app.request("/todos")).json()).toHaveLength(1);
  });
  it("refuses bad input and unknown todos", async () => {
    const app = createApp();
    expect((await app.request("/todos", { method: "POST", body: "{}", headers: { "content-type": "application/json" } })).status).toBe(400);
    expect((await app.request("/todos/9", { method: "PATCH", body: JSON.stringify({ done: true }) })).status).toBe(404);
    expect((await app.request("/nope")).status).toBe(404);
  });
});

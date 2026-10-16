import { DurableObject } from "cloudflare:workers";

const json = (data, status = 200) => Response.json(data, {
  status,
  headers: { "Cache-Control": "no-store" },
});

export class Guestbook extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, n TEXT NOT NULL, m TEXT NOT NULL, t INTEGER NOT NULL)");
  }

  async fetch(request) {
    if (request.method === "GET") return json(this.notes());
    if (request.method !== "POST") {
      return new Response(null, { status: 405, headers: { Allow: "GET, POST" } });
    }
    let input;
    try {
      input = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }
    if (typeof input?.m !== "string" || !input.m.trim()) {
      return json({ error: "Message is required" }, 400);
    }
    const n = typeof input.n === "string" ? input.n.trim().slice(0, 24) : "";
    this.sql.exec("INSERT INTO notes (n, m, t) VALUES (?, ?, ?)", n || "anonymous", input.m.trim().slice(0, 160), Date.now());
    return json({ success: true, notes: this.notes() }, 201);
  }

  notes() {
    return this.sql.exec("SELECT n, m, t FROM (SELECT id, n, m, t FROM notes ORDER BY id DESC LIMIT 50) ORDER BY id ASC").toArray();
  }
}

const worker = {
  async fetch(request, env) {
    if (new URL(request.url).pathname === "/api/guestbook") {
      try {
        return await env.GUESTBOOK.getByName("shared").fetch(request);
      } catch {
        return json({ error: "Guestbook unavailable" }, 503);
      }
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;

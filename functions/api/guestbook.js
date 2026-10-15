let cachedNotes = [];

export async function onRequestGet({ env }) {
  try {
    if (env && env.GUESTBOOK_KV) {
      const data = await env.GUESTBOOK_KV.get("notes", "json");
      if (data && Array.isArray(data)) {
        return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }
    }
    return new Response(JSON.stringify(cachedNotes), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify(cachedNotes), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const newNote = await request.json();
    if (!newNote || !newNote.m) {
      return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
    }
    const cleanNote = {
      n: String(newNote.n || "anonymous").trim().slice(0, 30),
      m: String(newNote.m || "").trim().slice(0, 200),
      t: Date.now()
    };
    cachedNotes.unshift(cleanNote);
    cachedNotes = cachedNotes.slice(0, 50);

    if (env && env.GUESTBOOK_KV) {
      await env.GUESTBOOK_KV.put("notes", JSON.stringify(cachedNotes));
    }

    return new Response(JSON.stringify({ success: true, notes: cachedNotes }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

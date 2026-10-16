export async function onRequest({ request, env }) {
  try {
    return await env.GUESTBOOK_SERVICE.fetch(request);
  } catch {
    return Response.json({ error: "Shared guestbook unavailable" }, {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}

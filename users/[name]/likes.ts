export interface Env {
  LIKES_KV: KVNamespace;
}

export async function onRequest(context: {
  request: Request;
  env: Env;
  params: Record<string, string>;
}) {
  const { request, env, params } = context;

  const postSlug = params.slug;
  if (!postSlug) {
    return new Response("Missing post slug", { status: 400 });
  }

  if (request.method === "POST") {
    // Receive a like
    const data = await request.json();
    if (!data.actor) {
      return new Response("Missing actor", { status: 400 });
    }

    // Use actor+postSlug as unique key to avoid duplicate likes
    const key = `likes:${postSlug}:${data.actor}`;
    await env.LIKES_KV.put(key, JSON.stringify({
      actor: data.actor,
      likedAt: new Date().toISOString()
    }));

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/activity+json" },
      status: 201
    });
  }

  if (request.method === "GET") {
    // List all likes for a post
    const list = await env.LIKES_KV.list({ prefix: `likes:${postSlug}:` });
    const likes = await Promise.all(
      list.keys.map(async (key) => {
        const value = await env.LIKES_KV.get(key.name);
        return value ? JSON.parse(value) : null;
      })
    );

    return new Response(JSON.stringify(likes.filter(Boolean)), {
      headers: { "Content-Type": "application/activity+json" }
    });
  }

  return new Response("Method not allowed", { status: 405 });
}

export interface Env {
  COMMENTS_KV: KVNamespace;
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
    // Add a new comment
    const data = await request.json();
    if (!data.author || !data.text) {
      return new Response("Missing author or text", { status: 400 });
    }

    const id = crypto.randomUUID();
    const comment = {
      id,
      author: data.author,
      text: data.text,
      published: new Date().toISOString(),
    };

    // Store in KV under `comments:{postSlug}:{id}`
    await env.COMMENTS_KV.put(`comments:${postSlug}:${id}`, JSON.stringify(comment));

    return new Response(JSON.stringify(comment), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  }

  if (request.method === "GET") {
    // List all comments for a post
    const list = await env.COMMENTS_KV.list({ prefix: `comments:${postSlug}:` });
    const comments = await Promise.all(
      list.keys.map(async (key) => {
        const value = await env.COMMENTS_KV.get(key.name);
        return value ? JSON.parse(value) : null;
      })
    );

    return new Response(JSON.stringify(comments.filter(Boolean)), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Method not allowed", { status: 405 });
}

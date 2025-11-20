export async function onRequestGet({ params, env }) {
  const username = params.name;

  const itemsRaw = await env.ACTIVITYPUB_KV.get(`outbox:${username}`);
  const items = itemsRaw ? JSON.parse(itemsRaw) : [];

  const outbox = {
    "@context": "https://www.w3.org/ns/activitystreams",
    "id": `https://about.itsrye.dev/users/${username}/outbox`,
    "type": "OrderedCollection",
    "totalItems": items.length,
    "orderedItems": items
  };

  return new Response(JSON.stringify(outbox), {
    headers: { "Content-Type": "application/activity+json" }
  });
}

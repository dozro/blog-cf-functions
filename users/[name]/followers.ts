export async function onRequestGet({ params, env }) {
  const username = params.name;

  if (!username) {
    return new Response("Missing username", { status: 400 });
  }

  // Use KV to store followers, fallback to empty array
  const followersRaw = await env.ACTIVITYPUB_KV.get(`followers:${username}`);
  const followers: string[] = followersRaw ? JSON.parse(followersRaw) : [];

  const followersCollection = {
    "@context": "https://www.w3.org/ns/activitystreams",
    "id": `https://about.itsrye.dev/users/${username}/followers`,
    "type": "Collection",
    "totalItems": followers.length,
    "items": followers
  };

  return new Response(JSON.stringify(followersCollection), {
    headers: { "Content-Type": "application/activity+json" }
  });
}

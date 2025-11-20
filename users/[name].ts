export async function onRequestGet({ params, env }) {
  const username = params.name;

  if (!username) {
    return new Response("Missing username", { status: 400 });
  }
  const actor = {
    "@context": ["https://www.w3.org/ns/activitystreams"],
    "id": `https://about.itsrye.dev/users/${username}`,
    "type": "Person",
    "preferredUsername": username,
    "inbox": `https://about.itsrye.dev/users/${username}/inbox`,
    "outbox": `https://about.itsrye.dev/users/${username}/outbox`,
    "followers": `https://about.itsrye.dev/users/${username}/followers`,
    "url": `https://about.itsrye.dev/`,
    "icon": {
      "type": "Image",
      "mediaType": "image/png",
      "url": "https://about.itsrye.dev/images/avatar.png"
    }
  };

  return new Response(JSON.stringify(actor), {
    headers: { "Content-Type": "application/activity+json" }
  });
}

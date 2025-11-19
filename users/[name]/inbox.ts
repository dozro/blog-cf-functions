export async function onRequestPost({ request, env, params }) {
  try {
    console.log("ENV keys:", Object.keys(env));
    const username = params.name;

    // Ensure Content-Type is ActivityPub JSON
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/activity+json")) {
      return new Response("Unsupported content type", { status: 415 });
    }

    // Parse the incoming ActivityPub JSON body
    const activity = await request.json();

    // Fallback actor name if query unknown (not critical)
    const actor = `https://yourdomain.com/users/${username}`;

    // Store raw activity in KV (timestamped key)
    const key = `inbox:${username}:${Date.now()}`;
    await env.ACTIVITYPUB_KV.put(key, JSON.stringify(activity));

    // Handle Follow requests by updating followers list
    if (activity.type === "Follow" && activity.actor) {
      const followersKey = `followers:${username}`;
      const followers =
        (await env.ACTIVITYPUB_KV.get(followersKey, { type: "json" })) || [];

      if (!followers.includes(activity.actor)) {
        followers.push(activity.actor);

        await env.ACTIVITYPUB_KV.put(
          followersKey,
          JSON.stringify(followers)
        );
      }
    }

    // ActivityPub requires a 202 response (Accepted but not processed synchronously)
    return new Response(null, { status: 202 });

  } catch (err) {
    console.error("Inbox error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

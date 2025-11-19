export async function onRequestPost({ request, env, params }) {
  const username = params.name;

  // Parse ActivityPub message
  const activity = await request.json();

  // Log the activity into KV
  const key = `inbox:${Date.now()}`;
  await env.ACTIVITYPUB_KV.put(key, JSON.stringify(activity));

  // If it's a Follow request, update follower list
  if (activity.type === "Follow") {
    const followers =
      (await env.ACTIVITYPUB_KV.get("followers", { type: "json" })) || [];

    if (!followers.includes(activity.actor)) {
      followers.push(activity.actor);
      await env.ACTIVITYPUB_KV.put(
        "followers",
        JSON.stringify(followers)
      );
    }
  }

  return new Response("OK", { status: 202 });
}

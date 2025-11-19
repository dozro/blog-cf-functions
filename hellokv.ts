export async function onRequestPost({ env }) {
  console.log("env keys", Object.keys(env));

  await env.ACTIVITYPUB_KV.put("hello", "world");

  const result = await env.ACTIVITYPUB_KV.get("hello");

  return new Response("KV says: " + result);
}
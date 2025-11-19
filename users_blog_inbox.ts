export async function onRequestPost(context) {
  const body = await context.request.json();

  // You can store in KV: context.env.YOUR_KV.put(...)
  console.log("Inbox message", body);

  return new Response("OK", { status: 202 });
}

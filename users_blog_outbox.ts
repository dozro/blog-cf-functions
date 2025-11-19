export async function onRequest(context) {
  const res = await fetch("https://about.itsrye.dev/users/blog/outbox/index.json");
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/activity+json" }
  });
}

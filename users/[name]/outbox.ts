export async function onRequestGet({ params }) {
  const username = params.name;
  const url = new URL(
    `https://about.itsrye.dev/users/${username}/outbox/index.apjson`
  );
  const response = await fetch(url);

  if (!response.ok) {
    return new Response("File not found", { status: 404 });
  }

  const fileBody = await response.arrayBuffer();
  const mimeType = "application/activity+json";

  return new Response(fileBody, {
    status: 200,
    headers: {
      "Content-Type": mimeType,
    },
  });
}

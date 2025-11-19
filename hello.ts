export async function onRequest(context) {
    return new Response("Cloudflare functions are listening", { status: 200 });
}
export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const resource = url.searchParams.get("resource");

  if (!resource || !resource.startsWith("acct:")) {
    return new Response("Invalid resource", { status: 400 });
  }

  const [username, domain] = resource.replace("acct:", "").split("@");

  if (domain !== "about.itsrye.dev") {
    return new Response("Not found", { status: 404 });
  }

  const actorUrl = `https://about.itsrye.dev/users/${username}`;

  const webfingerResponse = {
    subject: `acct:${username}@${domain}`,
    aliases: [actorUrl],
    links: [
      {
        rel: "self",
        type: "application/activity+json",
        href: actorUrl
      },
        {
        rel: "http://webfinger.net/rel/profile-page",
        type: "text/html",
        href: `https://about.itsrye.dev/`
      },
      { rel: "http://ostatus.org/schema/1.0/subscribe",
        template: `https://about.itsrye.dev/users/${username}/followers`
    }
    ]
  };

  return new Response(JSON.stringify(webfingerResponse), {
    headers: { "Content-Type": "application/jrd+json" }
  });
}

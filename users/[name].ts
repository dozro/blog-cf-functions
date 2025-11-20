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
    "name": "Rye's Blog",
    "summary": "Personal blog of Rye",
    "discoverable": true,
    "indexable": true,
    "inbox": `https://about.itsrye.dev/users/${username}/inbox`,
    "outbox": `https://about.itsrye.dev/users/${username}/outbox`,
    "followers": `https://about.itsrye.dev/users/${username}/followers`,
    "url": `https://about.itsrye.dev/`,
    "icon": {
      "type": "Image",
      "mediaType": "image/png",
      "url": "https://about.itsrye.dev/images/avatar.png"
    },
    "attachment": [
      {
        "type": "PropertyValue",
        "name": "mastodon",
        "value": "@rye@catcatnya.com"
      },
      {
        "type": "PropertyValue",
        "name": "github",
        "value": "https://github.com/dozro"
      },
      {
        "type": "PropertyValue",
        "name": "main mastodon account",
        "value": "<p><a href=\"https://catcatnya.com/@rye\">https://catcatnya.com/@rye</a></p>"
      },
    ],
    "_misskey_requireSigninToViewContents": false,
    "enableRss": true,
    "vcard:Address": "Europe",
    "listenbrainz": "ryelavaplanetnixeris",
    "backgroundUrl": {
      "type": "Image",
      "url": "https://about.itsrye.dev/images/background.webp",
      "sensitive": false,
      "name": "background"
    },
  };

  return new Response(JSON.stringify(actor), {
    headers: { "Content-Type": "application/activity+json" }
  });
}

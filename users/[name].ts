export async function onRequestGet({ params, env }) {
  const username = params.name;

  if (!username) {
    return new Response("Missing username", { status: 400 });
  }
  const actor = {
    "@context": [
      "https://www.w3.org/ns/activitystreams",
      "https://w3id.org/security/v1",
      {
        Key: "sec:Key",
        manuallyApprovesFollowers: "as:manuallyApprovesFollowers",
        sensitive: "as:sensitive",
        Hashtag: "as:Hashtag",
        quoteUrl: "as:quoteUrl",
        fedibird: "http://fedibird.com/ns#",
        quoteUri: "fedibird:quoteUri",
        quote: {
          "@id": "https://w3id.org/fep/044f#quote",
          "@type": "@id",
        },
        toot: "http://joinmastodon.org/ns#",
        Emoji: "toot:Emoji",
        featured: "toot:featured",
        discoverable: "toot:discoverable",
        indexable: "toot:indexable",
        attributionDomains: {
          "@id": "toot:attributionDomains",
          "@type": "@id",
        },
        schema: "http://schema.org#",
        PropertyValue: "schema:PropertyValue",
        value: "schema:value",
        misskey: "https://misskey-hub.net/ns#",
        _misskey_content: "misskey:_misskey_content",
        _misskey_quote: "misskey:_misskey_quote",
        _misskey_reaction: "misskey:_misskey_reaction",
        _misskey_votes: "misskey:_misskey_votes",
        _misskey_summary: "misskey:_misskey_summary",
        _misskey_followedMessage: "misskey:_misskey_followedMessage",
        _misskey_requireSigninToViewContents:
          "misskey:_misskey_requireSigninToViewContents",
        _misskey_makeNotesFollowersOnlyBefore:
          "misskey:_misskey_makeNotesFollowersOnlyBefore",
        _misskey_makeNotesHiddenBefore:
          "misskey:_misskey_makeNotesHiddenBefore",
        _misskey_license: "misskey:_misskey_license",
        freeText: {
          "@id": "misskey:freeText",
          "@type": "schema:text",
        },
        isCat: "misskey:isCat",
        firefish: "https://joinfirefish.org/ns#",
        speakAsCat: "firefish:speakAsCat",
        sharkey: "https://joinsharkey.org/ns#",
        hideOnlineStatus: "sharkey:hideOnlineStatus",
        backgroundUrl: "sharkey:backgroundUrl",
        listenbrainz: "sharkey:listenbrainz",
        enableRss: "sharkey:enableRss",
        vcard: "http://www.w3.org/2006/vcard/ns#",
      },
    ],
    id: `https://about.itsrye.dev/users/${username}`,
    type: "Person",
    preferredUsername: username,
    name: "Rye's Blog",
    summary: "Personal blog of Rye",
    discoverable: true,
    indexable: true,
    inbox: `https://about.itsrye.dev/users/${username}/inbox`,
    outbox: `https://about.itsrye.dev/users/${username}/outbox`,
    followers: `https://about.itsrye.dev/users/${username}/followers`,
    url: `https://about.itsrye.dev/`,
    icon: {
      type: "Image",
      mediaType: "image/png",
      url: "https://about.itsrye.dev/images/avatar.png",
    },
    attachment: [
      {
        type: "PropertyValue",
        name: "mastodon",
        value: "@rye@catcatnya.com",
      },
      {
        type: "PropertyValue",
        name: "github",
        value: "https://github.com/dozro",
      },
      {
        type: "PropertyValue",
        name: "main mastodon account",
        value:
          '<p><a href="https://catcatnya.com/@rye">https://catcatnya.com/@rye</a></p>',
      },
    ],
    _misskey_requireSigninToViewContents: false,
    enableRss: true,
    "vcard:Address": "Europe",
    listenbrainz: "ryelavaplanetnixeris",
    backgroundUrl: {
      type: "Image",
      url: "https://about.itsrye.dev/images/background.webp",
      sensitive: false,
      name: "background",
    },
  };

  return new Response(JSON.stringify(actor), {
    headers: { "Content-Type": "application/activity+json" },
  });
}

// Comprehensive Badge List
// Mixing official verified URLs and legacy URLs found in the project.

export const BADGE_ASSETS = {
  // 0. Staff / Admin (Wrench-like icon in original list index 0)
  STAFF:
    "https://static-cdn.jtvnw.net/badges/v1/d97c37bd-a6f5-4c38-8f57-4e4bef88af34/1",

  // 1. Turbo (Battery)
  TURBO:
    "https://static-cdn.jtvnw.net/badges/v1/9ef7e029-4cdf-4d4d-a0d5-e2b3fb2583fe/1",

  // 2. Broadcaster (Red Camera)
  BROADCASTER:
    "https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1",

  // 3. Moderator (Green Sword)
  MODERATOR:
    "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1",

  // 4. Partner / Verified (Purple Check? Or original index 4: d12a... )
  // Index 4 was "d12a..." which is PARTNER (Purple Checkmark mostly)
  VERIFIED:
    "https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/3",

  // 5. VIP (Diamond)
  VIP: "https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/3",

  // 6. Unknown / Artist? (bd44...)
  ARTIST:
    "https://static-cdn.jtvnw.net/badges/v1/bd444ec6-8f34-4bf9-91f4-af1e3428d80f/1",

  // 7. DJ Badge? (a1dd...)
  DJ: "https://static-cdn.jtvnw.net/badges/v1/a1dd5073-19c3-4911-8cb4-c464a7bc1510/1",

  // 8. Prime Gaming (Blue Crown) - Added manually before
  PRIME:
    "https://static-cdn.jtvnw.net/badges/v1/d97c37bd-a6f5-4c38-8f57-4e4bef88af34/1", // Note: This might be duplicate of Staff in my list if URL is same.
  // Wait, in my previous edit I pasted d97c... for Prime, but d97c is Staff.
  // Let's find a Real Prime URL or use the one from original list if it was there?
  // Original list had 8 items.
  // Let's use a known Prime URL if possible, or sticking to what the user had visually.
  // User image showed Blue Crown.
  // Let's use a standard Prime URL:
  PRIME_REAL:
    "https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-b7d0-a9a5e8ebd513/1",

  // 9. Subscriber (Star) - Added by me
  SUBSCRIBER:
    "https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/1",
};

// Restore the EXACT original array order for legacy compatibility (indices 0-7)
export const emblestList = [
  BADGE_ASSETS.STAFF, // 0
  BADGE_ASSETS.TURBO, // 1
  BADGE_ASSETS.BROADCASTER, // 2
  BADGE_ASSETS.MODERATOR, // 3
  BADGE_ASSETS.VERIFIED, // 4
  BADGE_ASSETS.VIP, // 5
  BADGE_ASSETS.ARTIST, // 6
  BADGE_ASSETS.DJ, // 7
  BADGE_ASSETS.PRIME_REAL, // 8 (Extra)
  BADGE_ASSETS.SUBSCRIBER, // 9 (Extra)
];

// Common Twitch Emotes CDN
export const EMOTES = {
  Kappa: "https://static-cdn.jtvnw.net/emoticons/v2/25/default/dark/1.0",
  PogChamp:
    "https://static-cdn.jtvnw.net/emoticons/v2/305954156/default/dark/1.0", // New Pog
  LUL: "https://static-cdn.jtvnw.net/emoticons/v2/425618/default/dark/1.0",
  Kreygasm: "https://static-cdn.jtvnw.net/emoticons/v2/41/default/dark/1.0",
  SeemsGood: "https://static-cdn.jtvnw.net/emoticons/v2/64138/default/dark/1.0",
  BibleThump: "https://static-cdn.jtvnw.net/emoticons/v2/86/default/dark/1.0",
  POGGERS: "https://cdn.7tv.app/emote/60ae3587259ac5a73e56c426/1x.webp", // 7TV
  OMEGALUL: "https://cdn.7tv.app/emote/60ae8d9ff39a7552b658b60d/1x.webp",
  KEKW: "https://cdn.7tv.app/emote/60b00d1f0d3a78a196f803e3/1x.webp",
  monkaS: "https://cdn.7tv.app/emote/60ae3e51259ac5a73e56c54a/1x.webp",
  Pepega: "https://cdn.7tv.app/emote/60ae480a259ac5a73e56c66d/1x.webp",
  EZ: "https://cdn.7tv.app/emote/63071b80942ff969e0f6c5f9/1x.webp",
  Clap: "https://cdn.7tv.app/emote/62fc4c843c080721c5b8b935/1x.webp",
};

// Animated Bits (GIFs)
export const BIT_ASSETS = {
  1: "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/1.gif",
  100: "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/100/1.gif",
  1000: "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1000/1.gif",
  5000: "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/5000/1.gif",
  10000:
    "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/10000/1.gif",
};

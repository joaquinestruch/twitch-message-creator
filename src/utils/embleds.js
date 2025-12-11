// Comprehensive Badge List 
// Mixing official verified URLs and legacy URLs found in the project.

export const BADGE_ASSETS = {
    // 0. Staff / Admin (Wrench-like icon in original list index 0)
    STAFF: "https://static-cdn.jtvnw.net/badges/v1/d97c37bd-a6f5-4c38-8f57-4e4bef88af34/1",

    // 1. Turbo (Battery)
    TURBO: "https://static-cdn.jtvnw.net/badges/v1/9ef7e029-4cdf-4d4d-a0d5-e2b3fb2583fe/1",

    // 2. Broadcaster (Red Camera)
    BROADCASTER: "https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1",

    // 3. Moderator (Green Sword)
    MODERATOR: "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1",

    // 4. Partner / Verified (Purple Check? Or original index 4: d12a... )
    // Index 4 was "d12a..." which is PARTNER (Purple Checkmark mostly)
    VERIFIED: "https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/3",

    // 5. VIP (Diamond)
    VIP: "https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/3",

    // 6. Unknown / Artist? (bd44...)
    ARTIST: "https://static-cdn.jtvnw.net/badges/v1/bd444ec6-8f34-4bf9-91f4-af1e3428d80f/1",

    // 7. DJ Badge? (a1dd...)
    DJ: "https://static-cdn.jtvnw.net/badges/v1/a1dd5073-19c3-4911-8cb4-c464a7bc1510/1",
    
    // 8. Prime Gaming (Blue Crown) - Added manually before
    PRIME: "https://static-cdn.jtvnw.net/badges/v1/d97c37bd-a6f5-4c38-8f57-4e4bef88af34/1", // Note: This might be duplicate of Staff in my list if URL is same. 
    // Wait, in my previous edit I pasted d97c... for Prime, but d97c is Staff.
    // Let's find a Real Prime URL or use the one from original list if it was there? 
    // Original list had 8 items. 
    // Let's use a known Prime URL if possible, or sticking to what the user had visually.
    // User image showed Blue Crown. 
    // Let's use a standard Prime URL:
    PRIME_REAL: "https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-b7d0-a9a5e8ebd513/1",

    // 9. Subscriber (Star) - Added by me
    SUBSCRIBER: "https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/1"
};

// Restore the EXACT original array order for legacy compatibility (indices 0-7)
export const emblestList = [
    BADGE_ASSETS.STAFF,       // 0
    BADGE_ASSETS.TURBO,       // 1
    BADGE_ASSETS.BROADCASTER, // 2
    BADGE_ASSETS.MODERATOR,   // 3
    BADGE_ASSETS.VERIFIED,    // 4
    BADGE_ASSETS.VIP,         // 5
    BADGE_ASSETS.ARTIST,      // 6
    BADGE_ASSETS.DJ,          // 7
    BADGE_ASSETS.PRIME_REAL,  // 8 (Extra)
    BADGE_ASSETS.SUBSCRIBER   // 9 (Extra)
];
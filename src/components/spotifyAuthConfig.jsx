export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
// export const clientId = "fffd485243824e48867fb8a4a454988c";
// export const redirectUri = "https://muhardiansyah15.github.io/my-spotify-stats";

// Local Config
export const clientId = "d2302027010c45f790bef63eab495ae1";
export const redirectUri = "http://localhost:5173/my-spotify-stats/";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
];
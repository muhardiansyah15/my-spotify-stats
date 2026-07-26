// Spotify app configuration.
// The redirect URI is derived from wherever the app is served, so the same
// build works on GitHub Pages and on a local dev server. Every variant you use
// must be registered in the Spotify Developer Dashboard, e.g.:
//   https://muhardiansyah15.github.io/my-spotify-stats/
//   http://127.0.0.1:5173/my-spotify-stats/   (Spotify no longer accepts "localhost")
export const clientId = "fffd485243824e48867fb8a4a454988c";

export const redirectUri = window.location.origin + import.meta.env.BASE_URL;

export const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
];

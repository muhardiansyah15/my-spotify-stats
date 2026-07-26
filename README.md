# Resonance · Your Spotify Stats

A music-themed dashboard that turns your Spotify listening history into
personalized insights: top artists, top tracks, genre breakdowns, a
"mainstream score", and a live Now Playing view with a spinning vinyl.

Live site: https://muhardiansyah15.github.io/my-spotify-stats/

## Features

- **Top Genres** — a horizontal bar chart of how often each genre appears
  across your top 50 artists, with hover tooltips.
- **Top Artists & Top Tracks** — your heavy rotation, with rank medals,
  album art, popularity bars, and direct links to Spotify.
- **Time ranges** — switch between Last 4 Weeks, Last 6 Months, and All Time.
- **Now Playing** — polls the player every 30 seconds and shows the current
  track on a spinning vinyl with a live progress bar.
- **Stat tiles** — top artist, top track, genres explored, and a
  Mainstream Score (average track popularity, 0–100).

## How it works

1. You sign in with Spotify using the **Authorization Code flow with PKCE** —
   the flow Spotify recommends for single-page apps (the old Implicit Grant
   flow is deprecated). No client secret, no backend: tokens are exchanged
   and refreshed directly from the browser.
2. The app requests read-only scopes (`user-top-read`,
   `user-read-currently-playing`, `user-read-playback-state`) and calls the
   [Spotify Web API](https://developer.spotify.com/documentation/web-api)
   with the native `fetch` API.
3. All data stays in your browser — nothing is stored on a server.

## Tech stack

- **React 18 + Vite** — no other runtime dependencies.
- Hand-rolled CSS (dark, music-themed design system) — no UI framework.
- Charts are plain HTML/CSS with a colorblind-safe, contrast-validated
  palette.
- Deployed to GitHub Pages via GitHub Actions.

## Development

```bash
npm install
npm run dev     # serves on http://127.0.0.1:5173/my-spotify-stats/
npm run build   # production build to dist/
npm run lint
```

### Spotify app setup

In the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard),
your app must have these **Redirect URIs** registered (exact match, note the
trailing slash):

- `https://muhardiansyah15.github.io/my-spotify-stats/`
- `http://127.0.0.1:5173/my-spotify-stats/` — for local dev; Spotify no
  longer accepts `localhost`, use the loopback IP.

If the app is in *development mode*, each Spotify account that logs in must
be added under **User Management** in the dashboard.

## Contribution

Contributions, issues, and feature requests are welcome! If you find a bug or
have an idea for an improvement, please open an issue or submit a pull
request.

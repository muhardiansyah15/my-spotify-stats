import { redirectToSpotifyLogin } from "../spotify/auth";

const SpotifyMark = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.5 17.3a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 1 1-.33-1.46c4.57-1.05 8.5-.6 11.66 1.34.35.22.46.68.25 1.03zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.54-1.79c4.36-1.32 9.79-.68 13.49 1.6.44.27.58.85.31 1.28zm.13-3.41C15.24 8.32 8.94 8.11 5.25 9.23a1.12 1.12 0 1 1-.65-2.15c4.24-1.28 11.28-1.03 15.72 1.6a1.12 1.12 0 0 1-1.22 1.94z" />
  </svg>
);

export default function Login({ error }) {
  return (
    <main className="login">
      <div className="login-glow" aria-hidden="true" />
      <div className="login-inner">
        <span className="eq eq-hero" aria-hidden="true">
          <i /><i /><i /><i /><i /><i /><i />
        </span>
        <h1 className="login-title">
          Your music,<br />
          <span className="grad-text">measured.</span>
        </h1>
        <p className="login-sub">
          A personal dashboard for your Spotify listening — top artists, tracks,
          genres, and how mainstream your taste really is.
        </p>

        {error && <p className="login-error" role="alert">{error}</p>}

        <button className="btn-spotify" onClick={redirectToSpotifyLogin}>
          <SpotifyMark />
          Connect with Spotify
        </button>

        <ul className="login-points">
          <li>Read-only access — nothing is ever posted or changed</li>
          <li>Secure sign-in (Authorization Code + PKCE)</li>
          <li>Your data stays in your browser</li>
        </ul>
      </div>
    </main>
  );
}

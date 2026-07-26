// Authorization Code flow with PKCE — Spotify's recommended flow for SPAs.
// (The Implicit Grant flow this app previously used is deprecated.)
// Docs: https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow

import { clientId, redirectUri, scopes } from "./config";

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const KEYS = {
  accessToken: "sp_access_token",
  refreshToken: "sp_refresh_token",
  expiresAt: "sp_expires_at",
  verifier: "sp_code_verifier",
  state: "sp_auth_state",
};

function randomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values, (v) => chars[v % chars.length]).join("");
}

async function sha256Base64Url(input) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input)
  );
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** Redirect the browser to Spotify's consent page. */
export async function redirectToSpotifyLogin() {
  const verifier = randomString(64);
  const state = randomString(16);
  sessionStorage.setItem(KEYS.verifier, verifier);
  sessionStorage.setItem(KEYS.state, state);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    code_challenge_method: "S256",
    code_challenge: await sha256Base64Url(verifier),
    scope: scopes.join(" "),
    state,
  });
  window.location.assign(`${AUTH_ENDPOINT}?${params}`);
}

function storeTokens(data) {
  localStorage.setItem(KEYS.accessToken, data.access_token);
  localStorage.setItem(KEYS.expiresAt, String(Date.now() + data.expires_in * 1000));
  if (data.refresh_token) {
    localStorage.setItem(KEYS.refreshToken, data.refresh_token);
  }
}

async function requestToken(body) {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error_description || data.error || "Token request failed");
  }
  storeTokens(data);
  return data.access_token;
}

/**
 * If the current URL is a Spotify redirect (?code=… or ?error=…), finish the
 * flow: verify state, exchange the code, clean the URL. Returns an access
 * token, or null when the URL is not a callback.
 */
export async function handleRedirectCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const error = params.get("error");
  if (!code && !error) return null;

  const cleanUrl = window.location.pathname;
  window.history.replaceState({}, document.title, cleanUrl);

  if (error) throw new Error(`Spotify authorization failed: ${error}`);
  if (params.get("state") !== sessionStorage.getItem(KEYS.state)) {
    throw new Error("State mismatch — possible CSRF, please log in again.");
  }

  const verifier = sessionStorage.getItem(KEYS.verifier);
  sessionStorage.removeItem(KEYS.verifier);
  sessionStorage.removeItem(KEYS.state);
  if (!verifier) throw new Error("Missing PKCE verifier — please log in again.");

  return requestToken({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: verifier,
  });
}

/**
 * Returns a valid access token, refreshing it when it is about to expire.
 * Returns null when the user is not logged in (or the refresh fails).
 */
export async function getAccessToken() {
  const token = localStorage.getItem(KEYS.accessToken);
  const expiresAt = Number(localStorage.getItem(KEYS.expiresAt) || 0);
  if (token && Date.now() < expiresAt - 60_000) return token;

  const refreshToken = localStorage.getItem(KEYS.refreshToken);
  if (!refreshToken) return null;
  try {
    return await requestToken({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    });
  } catch {
    logout();
    return null;
  }
}

export function logout() {
  Object.values(KEYS).forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}

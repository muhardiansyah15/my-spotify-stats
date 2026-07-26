// Thin wrapper around the Spotify Web API using the native fetch API.
// https://developer.spotify.com/documentation/web-api

import { getAccessToken, logout } from "./auth";

const BASE = "https://api.spotify.com/v1";

async function apiGet(path) {
  const token = await getAccessToken();
  if (!token) {
    logout();
    throw new Error("SESSION_EXPIRED");
  }

  const response = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 204) return null; // e.g. nothing playing
  if (response.status === 401) {
    logout();
    throw new Error("SESSION_EXPIRED");
  }
  if (response.status === 403) {
    throw new Error(
      "Spotify refused the request (403). If this app is in development mode, your Spotify account must be added under User Management in the developer dashboard."
    );
  }
  if (response.status === 429) {
    throw new Error("Rate limited by Spotify — wait a moment and try again.");
  }
  if (!response.ok) {
    throw new Error(`Spotify API error ${response.status}`);
  }
  return response.json();
}

export const getProfile = () => apiGet("/me");

export const getTopArtists = (timeRange = "medium_term", limit = 50) =>
  apiGet(`/me/top/artists?time_range=${timeRange}&limit=${limit}`);

export const getTopTracks = (timeRange = "medium_term", limit = 50) =>
  apiGet(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`);

export const getNowPlaying = () => apiGet("/me/player/currently-playing");

export const TIME_RANGES = [
  { value: "short_term", label: "Last 4 Weeks" },
  { value: "medium_term", label: "Last 6 Months" },
  { value: "long_term", label: "All Time" },
];

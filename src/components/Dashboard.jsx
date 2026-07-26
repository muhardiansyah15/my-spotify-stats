import { useEffect, useMemo, useState } from "react";
import { getProfile, getTopArtists, getTopTracks, TIME_RANGES } from "../spotify/api";
import NowPlaying from "./NowPlaying";
import StatCards from "./StatCards";
import GenreChart from "./GenreChart";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";

function countGenres(artists) {
  const frequency = new Map();
  artists.forEach((artist) => {
    artist.genres.forEach((genre) => {
      frequency.set(genre, (frequency.get(genre) || 0) + 1);
    });
  });
  return [...frequency.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export default function Dashboard({ onLogout, onSessionExpired }) {
  const [profile, setProfile] = useState(null);
  const [timeRange, setTimeRange] = useState("medium_term");
  const [artists, setArtists] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfile().then(setProfile).catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;
    setArtists(null);
    setTracks(null);
    setError(null);
    Promise.all([getTopArtists(timeRange), getTopTracks(timeRange)])
      .then(([artistData, trackData]) => {
        if (cancelled) return;
        setArtists(artistData.items);
        setTracks(trackData.items);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.message === "SESSION_EXPIRED") onSessionExpired();
        else setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [timeRange, onSessionExpired]);

  const genres = useMemo(() => (artists ? countGenres(artists) : []), [artists]);
  const loading = !artists || !tracks;

  return (
    <>
      <header className="topbar">
        <div className="topbar-brand">
          <span className="eq" aria-hidden="true">
            <i /><i /><i /><i /><i />
          </span>
          <span className="brand-name">Resonance</span>
          <span className="brand-tag">your Spotify stats</span>
        </div>
        <div className="topbar-user">
          {profile && (
            <>
              {profile.images?.[0]?.url && (
                <img className="avatar" src={profile.images[0].url} alt="" />
              )}
              <span className="user-name">{profile.display_name}</span>
            </>
          )}
          <button className="btn-ghost" onClick={onLogout}>Log out</button>
        </div>
      </header>

      <main className="dashboard">
        <div className="range-row" role="tablist" aria-label="Time range">
          {TIME_RANGES.map((range) => (
            <button
              key={range.value}
              role="tab"
              aria-selected={timeRange === range.value}
              className={`range-pill${timeRange === range.value ? " active" : ""}`}
              onClick={() => setTimeRange(range.value)}
            >
              {range.label}
            </button>
          ))}
        </div>

        {error && <p className="panel-error" role="alert">{error}</p>}

        {loading && !error && (
          <div className="page-loader" role="status" aria-label="Loading stats">
            <span className="eq" aria-hidden="true">
              <i /><i /><i /><i /><i />
            </span>
          </div>
        )}

        {!loading && !error && (
          <>
            <StatCards artists={artists} tracks={tracks} genres={genres} />

            <div className="grid-2">
              <section className="card">
                <h2 className="card-title">Top Genres</h2>
                <p className="card-sub">
                  How often each genre appears across your top {artists.length} artists
                </p>
                <GenreChart genres={genres} totalArtists={artists.length} />
              </section>
              <NowPlaying />
            </div>

            <section className="card">
              <h2 className="card-title">Top Artists</h2>
              <p className="card-sub">The names behind your heavy rotation</p>
              <TopArtists artists={artists.slice(0, 10)} />
            </section>

            <section className="card">
              <h2 className="card-title">Top Tracks</h2>
              <p className="card-sub">Your most-played songs in this period</p>
              <TopTracks tracks={tracks.slice(0, 10)} />
            </section>
          </>
        )}
      </main>
    </>
  );
}

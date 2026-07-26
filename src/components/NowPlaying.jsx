import { useEffect, useRef, useState } from "react";
import { getNowPlaying } from "../spotify/api";

const POLL_MS = 30_000;

export default function NowPlaying() {
  const [playing, setPlaying] = useState(null);
  const [progress, setProgress] = useState(0);
  const syncRef = useRef({ base: 0, at: 0 });

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      try {
        const data = await getNowPlaying();
        if (cancelled) return;
        if (data?.item) {
          setPlaying(data);
          syncRef.current = { base: data.progress_ms ?? 0, at: Date.now() };
          setProgress(data.progress_ms ?? 0);
        } else {
          setPlaying(null);
        }
      } catch {
        if (!cancelled) setPlaying(null);
      }
    };

    poll();
    const pollTimer = setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(pollTimer);
    };
  }, []);

  // Advance the progress bar locally between polls while playback is active.
  useEffect(() => {
    if (!playing?.is_playing) return undefined;
    const tick = setInterval(() => {
      const { base, at } = syncRef.current;
      const duration = playing.item.duration_ms;
      setProgress(Math.min(base + (Date.now() - at), duration));
    }, 1000);
    return () => clearInterval(tick);
  }, [playing]);

  const track = playing?.item;
  const percent = track ? (progress / track.duration_ms) * 100 : 0;

  return (
    <section className="card now-playing">
      <h2 className="card-title">
        Now Playing
        {playing?.is_playing && (
          <span className="eq eq-live" aria-hidden="true">
            <i /><i /><i />
          </span>
        )}
      </h2>

      {!track && (
        <div className="np-idle">
          <div className="vinyl vinyl-idle" aria-hidden="true">
            <span className="vinyl-hole" />
          </div>
          <p className="empty-note">Nothing is playing right now — the turntable is resting.</p>
        </div>
      )}

      {track && (
        <div className="np-body">
          <div className={`vinyl${playing.is_playing ? " spinning" : ""}`}>
            {track.album?.images?.[1]?.url && (
              <img src={track.album.images[1].url} alt="" />
            )}
            <span className="vinyl-hole" aria-hidden="true" />
          </div>
          <div className="np-info">
            <a
              className="np-title"
              href={track.external_urls?.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              {track.name}
            </a>
            <span className="np-artist">
              {track.artists.map((a) => a.name).join(", ")}
            </span>
            <div
              className="np-progress"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(percent)}
              aria-label="Track progress"
            >
              <span className="np-progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <span className="np-state">
              {playing.is_playing ? "Playing" : "Paused"}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

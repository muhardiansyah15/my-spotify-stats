function MainstreamMeter({ value }) {
  const label =
    value >= 70 ? "Chart topper" : value >= 45 ? "Balanced" : "Deep cuts";
  return (
    <div className="meter" role="img" aria-label={`Mainstream score ${value} of 100 — ${label}`}>
      <div className="meter-track">
        <div className="meter-fill" style={{ width: `${value}%` }} />
      </div>
      <span className="meter-label">{label}</span>
    </div>
  );
}

export default function StatCards({ artists, tracks, genres }) {
  const topArtist = artists[0];
  const topTrack = tracks[0];
  const mainstream = Math.round(
    tracks.reduce((sum, track) => sum + track.popularity, 0) / tracks.length
  );

  return (
    <div className="stat-row">
      <div className="stat-tile">
        <span className="stat-caption">Top artist</span>
        <div className="stat-main">
          {topArtist?.images?.[2]?.url && (
            <img className="stat-thumb round" src={topArtist.images[2].url} alt="" />
          )}
          <span className="stat-value">{topArtist?.name ?? "—"}</span>
        </div>
      </div>

      <div className="stat-tile">
        <span className="stat-caption">Top track</span>
        <div className="stat-main">
          {topTrack?.album?.images?.[2]?.url && (
            <img className="stat-thumb" src={topTrack.album.images[2].url} alt="" />
          )}
          <span className="stat-value">{topTrack?.name ?? "—"}</span>
        </div>
      </div>

      <div className="stat-tile">
        <span className="stat-caption">Genres explored</span>
        <div className="stat-main">
          <span className="stat-value stat-number">{genres.length}</span>
        </div>
      </div>

      <div className="stat-tile">
        <span className="stat-caption">Mainstream score</span>
        <div className="stat-main">
          <span className="stat-value stat-number">{mainstream}</span>
          <span className="stat-unit">/100</span>
        </div>
        <MainstreamMeter value={mainstream} />
      </div>
    </div>
  );
}

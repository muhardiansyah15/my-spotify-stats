const MAX_BARS = 8;

// Single-series horizontal bar chart, hand-rolled in HTML/CSS:
// magnitude is carried by length in one hue; genre and value are direct-labeled.
export default function GenreChart({ genres, totalArtists }) {
  if (!genres.length) {
    return <p className="empty-note">No genre data for this period yet.</p>;
  }

  const top = genres.slice(0, MAX_BARS);
  const rest = genres.length - top.length;
  const max = top[0].count;

  return (
    <div className="genre-chart">
      {top.map((genre) => (
        <div
          key={genre.name}
          className="genre-row"
          tabIndex={0}
          aria-label={`${genre.name}: ${genre.count} of ${totalArtists} artists`}
        >
          <span className="genre-name">{genre.name}</span>
          <span className="genre-track">
            <span
              className="genre-bar"
              style={{ width: `${(genre.count / max) * 100}%` }}
            />
          </span>
          <span className="genre-value">{genre.count}</span>
          <span className="genre-tip" role="tooltip">
            {genre.name} — {genre.count} of your top {totalArtists} artists (
            {Math.round((genre.count / totalArtists) * 100)}%)
          </span>
        </div>
      ))}
      {rest > 0 && <p className="genre-more">+ {rest} more genres in your mix</p>}
    </div>
  );
}

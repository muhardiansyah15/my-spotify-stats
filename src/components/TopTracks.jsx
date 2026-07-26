function formatDuration(ms) {
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function TopTracks({ tracks }) {
  return (
    <table className="track-table">
      <thead>
        <tr>
          <th scope="col" className="col-rank">#</th>
          <th scope="col">Title</th>
          <th scope="col" className="col-album">Album</th>
          <th scope="col" className="col-pop">Popularity</th>
          <th scope="col" className="col-time">
            <span aria-hidden="true">⏱</span>
            <span className="sr-only">Duration</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track, index) => (
          <tr key={track.id}>
            <td className={`col-rank rank-num rank-${index + 1}`}>{index + 1}</td>
            <td>
              <a
                className="track-cell"
                href={track.external_urls?.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                {track.album?.images?.[2]?.url && (
                  <img className="track-art" src={track.album.images[2].url} alt="" loading="lazy" />
                )}
                <span className="track-text">
                  <span className="track-name">{track.name}</span>
                  <span className="track-artist">
                    {track.artists.map((a) => a.name).join(", ")}
                  </span>
                </span>
              </a>
            </td>
            <td className="col-album">{track.album?.name}</td>
            <td className="col-pop">
              <span
                className="pop-track"
                role="img"
                aria-label={`Popularity ${track.popularity} of 100`}
              >
                <span className="pop-fill" style={{ width: `${track.popularity}%` }} />
              </span>
            </td>
            <td className="col-time">{formatDuration(track.duration_ms)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

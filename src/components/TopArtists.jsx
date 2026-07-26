export default function TopArtists({ artists }) {
  return (
    <div className="artist-grid">
      {artists.map((artist, index) => (
        <a
          key={artist.id}
          className="artist-card"
          href={artist.external_urls?.spotify}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={`artist-photo rank-${index + 1}`}>
            {artist.images?.[1]?.url ? (
              <img src={artist.images[1].url} alt="" loading="lazy" />
            ) : (
              <span className="artist-fallback" aria-hidden="true">♪</span>
            )}
            <span className="rank-badge">{index + 1}</span>
          </div>
          <span className="artist-name">{artist.name}</span>
          {artist.genres?.[0] && (
            <span className="artist-genre">{artist.genres[0]}</span>
          )}
        </a>
      ))}
    </div>
  );
}

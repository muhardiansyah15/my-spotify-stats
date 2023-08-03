function ArtistCard(index, artist, imageUrl){
  return (
    <div key={index} className="card bg-dark-subtle feature" style={{width: "12rem", margin: "5px" }}>
      <img src={imageUrl} className="card-img-top"/>
      <div className="card-body">
        <h5 className="card-title">#{index+1} {artist}</h5>
      </div>
    </div>
  )
}

export default function SpotifyTopArtist({ data }) {

    return (
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {data.map((element, index) => (
            ArtistCard(index, element.name, element.images[1].url)
        ))}
      </div>
    );
  }
export default function SpotifyTopArtist({ data }) {
    return (
      <table>
        <thead>
          <tr>
            <td>#</td>
            <td style={{textAlign:"center"}} colSpan={2}>Artist</td>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => (
            <tr key={index}>
              <td style={{ width: "100px" }}>{index + 1}</td>
              <td style={{textAlign:"center", height: "120px", width: "250px" }}>
                <img style={{height: "100px"}} src={element.images[2].url} alt={element.name} />
              </td>
              <td>{element.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
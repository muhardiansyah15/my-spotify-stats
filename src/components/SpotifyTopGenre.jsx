function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function SpotifyTopGenre({ data }){
    return (
      <table>
        <thead>
          <tr>
            <td>#</td>
            <td>Genre</td>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => (
            <tr key={index}>
              <td style={{ width: "100px" }}>{index + 1}</td>
              <td>{capitalizeString(element.genreName)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
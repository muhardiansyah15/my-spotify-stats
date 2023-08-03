import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SpotifyTopSong({ token }) {
  const [topTracks, setTopTracks] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    var topTracks = [];
    const getTopTracks = async (token) => {
      const headers = {
          "Authorization": "Bearer " + token
      };
      await axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10", { headers }).then((response) => {
          topTracks = response.data.items;

      });

      // Sort the topArtists by popularity in descending order
      topTracks.sort((a, b) => b.popularity - a.popularity);
      setTopTracks(topTracks);
      setIsMounted(true);
    };

    getTopTracks(token);

  }, [])

  if (!isMounted)
    return (
        <div>
            <header>
                mounting
            </header>
        </div>
    )
  
  return (
    <table>
      <tbody>
        {topTracks.map((element, index) => (
          <tr key={index}>
            <td><h3>{index + 1}</h3></td>
            <td>
              <img style={{height: "100px"}} src={element.album.images[1].url}alt={element.name} />
            </td>
            <td><b>{element.name}</b><br/>{element.artists[0].name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  }
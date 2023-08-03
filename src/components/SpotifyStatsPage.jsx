import React, { useState, useEffect } from "react";
import SpotifyPieChart from "./SpotifyPieChart";
import SpotifyTopGenre from "./SpotifyTopGenre";
import SpotifyTopArtist from "./SpotifyTopArtist";
import axios from "axios";

export default function SpotifyStatsPage({ token }) {
    const [topGenres, setTopGenres] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [artistToGenres, setArtistToGenres] = useState([]);
    const [pieData, setPieData] = useState({})
    const [isMounted, setIsMounted] = useState(false);

    const indexOfMax = (arr) => {
        if (arr.length === 0) {
            return -1;
        }

        var max = arr[0];
        var maxIndex = 0;

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }

        return maxIndex;
    }

    useEffect(() => {
        var topArtists = [];
        const getTopArtists = async (token) => {
            const headers = {
                "Authorization": "Bearer " + token
            };
            await axios.get("https://api.spotify.com/v1/me/top/artists?time_range=long_term", { headers }).then((response) => {
                topArtists = response.data.items;

            })

            // Sort the topArtists by popularity in descending order
            topArtists.sort((a, b) => b.popularity - a.popularity);

            // Get the top 10 artists
            setTopArtists(topArtists.slice(0, 10));

            const currArtistsToGenres = topArtists.map((artist, index)=>{
                const artistName = artist.name;
                const imageURL = artist.images[0].url;
                const genresArr = artist.genres;
                return {
                    artistName: artistName,
                    genresArr: genresArr,
                    imageURL: imageURL
                }
            })

            setArtistToGenres(currArtistsToGenres);

            const unorganizedGenres = topArtists.map((artist, index) => {
                const genreArr = artist.genres;
                return genreArr;
            })

            const allGenres = [].concat(...unorganizedGenres)

            //sort frequency
            var frequency = {};
            allGenres.map((genre) => {
                frequency[genre] = 0;
            })


            allGenres.map((genre) => {
                frequency[genre] = frequency[genre] + 1;
            })

            const genreList = Object.entries(frequency).map(([genreName, frequency]) => ({
                genreName,
                frequency,
              }));

            // Sort the genreList by frequency in ascending order
            genreList.sort((a, b) => b.frequency - a.frequency);

            setPieData(genreList);
            setTopGenres(genreList.slice(0, 10));
            setIsMounted(true);
        }
        getTopArtists(token);
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
        <div>
            <section className="features">
                <h2>Genre Pie Chart</h2>
                <SpotifyPieChart chartData={pieData} artistToGenres={artistToGenres}  />
            </section>
            <section className="features">
                <h2>Your Top 10 Genres</h2>
                <SpotifyTopGenre data={topGenres}/>
            </section>
            <section className="features">
                <h2>Your Top 10 Artists</h2>
                <SpotifyTopArtist data={topArtists}/>
            </section>
        </div>
    );
};
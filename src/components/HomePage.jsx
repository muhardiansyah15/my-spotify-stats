import React, { useState, useEffect } from 'react'
import hash from "./hash";
import { authEndpoint, clientId, redirectUri, scopes } from "./spotifyAuthConfig.jsx";
import SpotifyStatsPage from './SpotifyStatsPage';
import Footer from './Footer';

const HomePage = () => {
    const [token, setToken] = useState(null);
    const [topTracks, setTopTracks] = useState([]);
    const [topTracksActivated, setTopTracksActivated] = useState(false);
    const [topArtists, setTopArtists] = useState([]);
    const [topArtistsActivated, setTopArtistsActivated] = useState(false);
    const getTopTracks = (token) => {
        setTopTracksActivated(true)
    }

    useEffect(() => {
        var mToken = hash.access_token;
        if (mToken) {
            setToken(mToken);
        }

    });
    console.log("tokeen = ",token);
    return (
        
        <div>
            <header>
                <div className="container">
                    <h1>Your Spotify Stats</h1>
                </div>
            </header>
            <section>
                <div className="container login-page">
                    {!token && (
                        <a className="btn-login"
                        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                        "%20"
                        )}&response_type=token&show_dialog=true`} >
                        Login to Spotify
                        </a>
                    
                    )}
                    {token && (
                        <SpotifyStatsPage token={token}/>
                    )}
                </div>
            </section>
            <Footer/>
        </div>
    )
}
export default HomePage;
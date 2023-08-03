import React, { useState, useEffect } from 'react'
import hash from "./hash";
import { authEndpoint, clientId, redirectUri, scopes } from "./spotifyAuthConfig.jsx";
import SpotifyStatsPage from './SpotifyStatsPage';
import Footer from './Footer';

const HomePage = () => {
    const [token, setToken] = useState(null);
    
    useEffect(() => {
        var mToken = hash.access_token;
        if (mToken) {
            setToken(mToken);
        }

    });
    return (
        
        <div>
            <header>
                <div className="container">
                    <h1>Your Spotify Stats</h1>
                </div>
            </header>
            <section>
                {!token && (
                    <div className="container login-page">
                        <a className="btn-login"
                        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                        "%20"
                        )}&response_type=token&show_dialog=true`} >
                        Login to Spotify
                        </a>
                    </div>
                
                )}
                {token && (
                        <SpotifyStatsPage token={token}/>
                )}
            </section>
            <Footer/>
        </div>
    )
}
export default HomePage;
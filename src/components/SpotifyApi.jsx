export const SpotifyApi = (type, range_time) => {
    let url = "https://api.spotify.com/v1/me/top"
    if (type == "tracks"){
        url += "/tracks"
    } else if (type=="artists"){
        url += "/artists"
    }
}
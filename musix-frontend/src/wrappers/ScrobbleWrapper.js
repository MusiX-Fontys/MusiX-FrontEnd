import axios from "axios";

const baseUrl = process.env.VUE_APP_API_BASE_URL;

export default {

    getHeaders(){
        return {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                "SpotifyToken": `${localStorage.getItem('access_token')}`
            }
        }
    },

    async updateRecentlyPlayed(){

        try{
            axios.get(`${baseUrl}/Spotify/recently-played`, this.getHeaders())
        }
        catch(error){
            alert('Scrobble Error')
        }
    },

    async getMostPopularArtists(){
        var response;

        try{
            response =  await axios.get(`${baseUrl}/Scrobble/popular-artists`, this.getHeaders())
        }
        catch(error){
            response = error.response
        }
        
        return {
            success: response.data["success"],
            message: response.data["message"],
            artists: response.data["data"]["artists"]
        }
    },

    async getMostPopularAlbums(){
        var response;

        try{
            response =  await axios.get(`${baseUrl}/Scrobble/popular-albums`, this.getHeaders())
        }
        catch(error){
            response = error.response
        }
        
        return {
            success: response.data["success"],
            message: response.data["message"],
            albums: response.data["data"]["albums"]
        }
    },

    async getMostPopularTracks(){
        var response;

        try{
            response =  await axios.get(`${baseUrl}/Scrobble/popular-tracks`, this.getHeaders())
        }
        catch(error){
            response = error.response
        }
        
        return {
            success: response.data["success"],
            message: response.data["message"],
            tracks: response.data["data"]["tracks"]
        }
    }
}
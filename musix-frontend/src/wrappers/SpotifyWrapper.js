import axios from "axios";
import TimeUtil from "../utils/TimeUtil";

const baseUrl = process.env.VUE_APP_SPOTIFY_API_BASE_URL;

export default {
    getHeaders(){
        return {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                "Content-Type": "application/json"
            }
        }
    },

    async getRecentlyPlayed(limit){
        try{
            const response =  await axios.get(`${baseUrl}/me/player/recently-played?limit=${limit}`, this.getHeaders())
            var items = response.data["items"]

            items.forEach(item => 
                {
                    item.played_at = TimeUtil.getTimeDifference(item.played_at)
                })

            return items
        }
        catch(error){
            console.log(error.response)
            return error.response
        }
    },

    async getCurrentlyPlaying(){
        try{
            const response =  await axios.get(`${baseUrl}/me/player/currently-playing`, this.getHeaders())

            if(response.status === 204){
                return null
            }
            
            return response.data["item"]
        }
        catch(error){
            console.log(error.response)
            return error.response
        }
    },
    
    async getSearchResults(search, searchType, page){
        try{
            const response =  await axios.get(`${baseUrl}/search?q=${search.replace(/ /g,"%20")}&type=${searchType}&offset=${(page - 1) * 12}&limit=12`, this.getHeaders())

            if(searchType === 'artist'){
                return {
                    success: true,
                    items: response.data["artists"]["items"],
                    total: response.data["artists"]["total"]
                }
            }
            else if(searchType === 'album'){
                return {
                    success: true,
                    items: response.data["albums"]["items"],
                    total: response.data["albums"]["total"]
                }
            }
            else if(searchType === 'track'){
                return {
                    success: true,
                    items: response.data["tracks"]["items"],
                    total: response.data["tracks"]["total"]
                }
            }
        }
        catch(error){
            console.log(error.response)
            return error.response
        }
    },

    async getArtistInfo(id){
        try{
            const response =  await axios.get(`${baseUrl}/artists/${id}`, this.getHeaders())
            const result = response.data

            return {
                id: result.id,
                name: result.name,
                image: result.images.length ? result.images[0].url : null,
                spotify: result.external_urls.spotify
            }
        }
        catch(error){
            console.log(error.response)
            return error.response
        }
    },

    async getArtistAlbums(id){
        try{
            const response =  await axios.get(`${baseUrl}/artists/${id}/albums?include_groups=album&limit=50`, this.getHeaders())
            const result = response.data.items.sort(i => i.available_markets.length)
            const albums = []

            result.forEach(album => {
                if(!albums.some(i => i.name === album.name)){
                    albums.push({
                        id: album.id,
                        name: album.name,
                        image: album.images.length ? album.images[0].url : null,
                        release_date: album.release_date
                    })
                }
            })

            return albums
        }
        catch(error){
            console.log(error.response)
            return error.response
        }
    },

    async getArtistSinglesAndEPs(id){
        try{
            const response =  await axios.get(`${baseUrl}/artists/${id}/albums?include_groups=single&limit=50`, this.getHeaders())
            const result = response.data.items.sort(i => i.available_markets.length)
            const singles = []

            result.forEach(single => {
                if(!singles.some(i => i.name === single.name)){
                    singles.push({
                        id: single.id,
                        name: single.name,
                        image: single.images.length ? single.images[0].url : null,
                        release_date: single.release_date
                    })
                }
            })

            return singles
        }
        catch(error){
            console.log(error.response)
            return error.response
        }
    },

    async getArtistTopTracks(id){
        try{
            const response =  await axios.get(`${baseUrl}/artists/${id}/top-tracks?market=US`, this.getHeaders())
            const result = response.data.tracks
            const tracks = []

            result.forEach(track => {
                tracks.push({
                    id: track.id,
                    name: track.name,
                    image: track.album.images.length ? track.album.images[0].url : null
                })
            })

            return tracks
        }
        catch(error){
            console.log(error.response)
            return error.response
        }
    },

    async getAlbumInfo(id){
        try{
            const response =  await axios.get(`${baseUrl}/albums/${id}`, this.getHeaders())
            const result = response.data
            console.log(result)

            return {
                id: result.id,
                name: result.name,
                image: result.images.length ? result.images[0].url : null,
                spotify: result.external_urls.spotify,
                tracks: result.tracks.items,
                artists: result.artists
            }
        }
        catch(error){
            console.log(error.response)
            return error.response
        }
    },

    async getTrackInfo(id){
        try{
            const response =  await axios.get(`${baseUrl}/tracks/${id}`, this.getHeaders())
            const result = response.data
            console.log(result)

            return {
                id: result.id,
                name: result.name,
                image: result.album.images.length ? result.album.images[0].url : null,
                release_date: result.album.release_date,
                duration: result.duration_ms,
                spotify: result.external_urls.spotify,
                artists: result.artists
            }
        }
        catch(error){
            console.log(error.response)
            return error.response
        }
    }
}
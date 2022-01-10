<template>
    <div id="most-popular">
        <div v-if="!artists.length && !albums.length && !tracks.length" id="loading">
            <em class="icon fas fa-spinner"/>Loading...
        </div>
        <PopularArtists v-if="artists.length" :artists="artists"/>
        <PopularAlbums v-if="albums.length" :albums="albums"/>
        <PopularTracks v-if="tracks.length" :tracks="tracks"/>
    </div>
</template>

<script>
import PopularArtists from '../components/home_components/PopularArtists.vue'
import PopularAlbums from '../components/home_components/PopularAlbums.vue'
import PopularTracks from '../components/home_components/PopularTracks.vue'
import ScrobbleWrapper from '../wrappers/ScrobbleWrapper'

export default {
    data() {
        return {
            artists: [],
            albums: [],
            tracks: []
        }
    },
    components: {
        PopularArtists,
        PopularAlbums,
        PopularTracks
    },
    created(){
        this.getMostPopularArtists()
        this.getMostPopularAlbums()
        this.getMostPopularTracks()
    },
    methods: {
        async getMostPopularArtists(){
            const response = await ScrobbleWrapper.getMostPopularArtists()

            if(response.success){
                this.artists = response.artists
            }
            else{
                alert(response.message)
            }
        },

        async getMostPopularAlbums(){
            const response = await ScrobbleWrapper.getMostPopularAlbums()

            if(response.success){
                this.albums = response.albums
            }
            else{
                alert(response.message)
            }
        },

        async getMostPopularTracks(){
            const response = await ScrobbleWrapper.getMostPopularTracks()

            if(response.success){
                this.tracks = response.tracks
            }
            else{
                alert(response.message)
            }
        }
    }
}
</script>
<style scoped>
    #most-popular{
        display: flex;
        justify-content: space-evenly;    
        align-items: center;
        height: calc(100% - 75px);
        width: 100%;
    }

    #loading{
        font-size: 4em;
        color: var(--secondary-color);
        display: flex;
        align-items: center;
    }

    .icon {
        margin-right: 5px;
        animation: rotation 1.5s infinite linear;
    }

    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }
</style>
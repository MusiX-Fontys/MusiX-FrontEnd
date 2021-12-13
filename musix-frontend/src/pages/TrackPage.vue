<template>
    <div id="panel">
        <div id="top">
            <img :src="track.image" id="profile-pic"/>
            <div id="top-right">
                <label id="title">{{ this.track.name }}</label>
                <button id="spotify" @click="redirectToSpotify">Open In Spotify<i class="icon fab fa-spotify"/></button>
            </div>
        </div>
        <div id="mid">
            <div class="album-header">                
                <label class="header">Artists</label>
            </div>
            <div>
                <AlbumArtist v-for="artist in track.artists" :key="artist.id"
                :id="artist.id" :name="artist.name" :image="artist.image"/>
            </div>
        </div>
        <div id="mid">
            <div class="album-header">                
                <label class="header">Info</label>
            </div>
            <div id="info">
                <label>Duration: <label>{{ getDuration() }} minutes</label></label>
                <label>Release Date: <label>{{ track.release_date }}</label></label>
            </div>
        </div>
    </div>
</template>
<script>
import AlbumArtist from '../components/album_components/AlbumArtist.vue'
import Spotify from '../wrappers/SpotifyWrapper'

export default {
    data() {
        return {
            id: '',
            track: {}
        }
    },
    components: {
        AlbumArtist
    },
    async created() {
        this.getTrackId()
        await this.getTrackInfo()
    },
    methods: {
        getTrackId(){
            this.id = this.$route.params.id
        },

        async getTrackInfo(){
            this.track = await Spotify.getTrackInfo(this.id)
            this.track.artists.forEach(async (artist) => {
                const response = await Spotify.getArtistInfo(artist.id)
                artist.image = response.image
            })
        },

        redirectToSpotify(){
            window.open(this.track.spotify)
        },

        getDuration(){
            var totalSeconds = (this.track.duration / 1000)
            var minutes = Math.floor(totalSeconds / 60)
            var seconds = Math.round(totalSeconds - (minutes * 60))
            if(seconds < 10){
                seconds = `0${seconds}`
            }
            return `${minutes}:${seconds}`
        }
    }
}
</script>
<style scoped>
    #panel{
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        padding: 25px;
        width: 47.5vw;
        max-height: fit-content;
        border-radius: 10px;
        background-color: var(--secondary-color);
        display: flex;
        flex-direction: column;
        overflow-y: overlay;
        box-shadow: 5px 5px 5px 1px rgb(0 0 0 / 50%)
    }

        #panel::-webkit-scrollbar {
                width: 15px;
            }

                #panel::-webkit-scrollbar-thumb {
                    border: 5px solid var(--secondary-color);
                    border-radius: 50px;
                    background-color: var(--primary-color);
                    background-clip: padding-box;
                    cursor: pointer;
                }

                    #panel::-webkit-scrollbar-thumb:hover {
                        opacity: 0.9;
                    }

    #top{
        display: flex;
        align-items: center;
    }

    #profile-pic{
        width:250px;
        height: 250px;
        object-fit: cover;
        border-radius: 5px;
    }

    #top-right{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-left: 20px;
        align-items: flex-start;
    }   

    #title{
        font-size: 4em;
        margin-bottom: 5px;
    }

    #spotify{    
        padding: 5px 20px;
        color: var(--secondary-color);
        border-radius: 5px;
        border: none;
        background-color: #1db954;
        font-family: inherit;
        font-size: 1.5em;
        display: flex;
        align-items: center;
        transition: 0.2s ease transform;
    }

        #spotify:hover{
            transform: scale(1.05);
            box-shadow: 3px 3px 5px 0px rgb(0 0 0 / 50%);
            cursor: pointer;
        }

    .icon{
        margin-left: 5px;
    }

    #mid{
        display: flex;
        margin-top: 25px;
        justify-content: space-between;
        flex-direction: column;
    }

    .header{
        font-size: 2em;
        margin-top: 10px;
    }

    #info{
        display: flex;
        flex-direction: column;
        font-size: 1.4em;
    }

        #info label label{
            color: var(--primary-color);
        }
</style>
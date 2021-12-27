<template>
    <div id="panel">
        <div id="top">
            <img :src="album.image" id="profile-pic" alt=""/>
            <div id="top-right">
                <label id="title">{{ this.album.name }}</label>
                <button id="spotify" @click="redirectToSpotify">Open In Spotify<em class="icon fab fa-spotify"/></button>
            </div>
        </div>
        <div id="mid">
            <div class="album-header">                
                <label class="header">Artists</label>
            </div>
            <div>
                <AlbumArtist v-for="artist in album.artists" :key="artist.id"
                :id="artist.id" :name="artist.name" :image="artist.image"/>
            </div>
        </div>
        <div id="mid">
            <div class="album-header">                
                <label class="header">Tracks</label>
            </div>
            <div>
                <AlbumTrack v-for="(track, index) in album.tracks" :key="track.id"
                :id="track.id" :index="index + 1" :name="track.name" :duration="track.duration_ms"/>
            </div>
        </div>
    </div>
</template>
<script>
import AlbumArtist from '../components/album_components/AlbumArtist.vue'
import AlbumTrack from '../components/album_components/AlbumTrack.vue'
import Spotify from '../wrappers/SpotifyWrapper'

export default {
    data() {
        return {
            id: '',
            album: {}
        }
    },
    components: {
        AlbumArtist,
        AlbumTrack
    },
    created() {
        this.getAlbumId()
        this.getAlbumInfo()
    },
    methods: {
        getAlbumId(){
            this.id = this.$route.params.id
        },

        async getAlbumInfo(){
            this.album = await Spotify.getAlbumInfo(this.id)
            this.album.artists.forEach(async (artist) => {
                const response = await Spotify.getArtistInfo(artist.id)
                artist.image = response.image
            })
        },

        redirectToSpotify(){
            window.open(this.album.spotify)
        }
    }
}
</script>
<style scoped>
    #panel{
        left: 0;
        right: 0;
        bottom: 0;
        margin: 40px auto;
        padding: 25px;
        width: 47.5vw;
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

    #tracks{
        display: flex;
    }

    .track-list{
        width: 50%;
    }
</style>
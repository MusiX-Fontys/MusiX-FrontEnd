<template>
    <div id="panel">
        <div id="top">
            <img :src="artist.image" id="profile-pic" alt=""/>
            <div id="top-right">
                <label id="title">{{ this.artist.name }}</label>
                <button id="spotify" @click="redirectToSpotify">Open In Spotify<em class="icon fab fa-spotify"/></button>
            </div>
        </div>
        <div id="mid">
            <div class="album-header">                
                <label class="header">Popular Tracks</label>
                <label v-if="!tracksViewAll" class="change-view" @click="tracksViewAll = true">View All</label>
                <label v-else class="change-view" @click="tracksViewAll = false">View Less</label>
            </div>
            <div v-if="!tracksViewAll">
                <PopularTrack v-for="(track, index) in popularTracks.slice(0, 5)" :key="track.id"
                :id="track.id" :index="index + 1" :name="track.name" :image="track.image" :type="'track'"/>
            </div>
            <div v-else id="tracks">
                <div class="track-list">
                    <PopularTrack v-for="(track, index) in popularTracks.slice(0, 5)" :key="track.id"
                    :id="track.id" :index="index + 1" :name="track.name" :image="track.image" :type="'track'"/>
                </div>
                <div class="track-list">
                    <PopularTrack v-for="(track, index) in popularTracks.slice(5, 10)" :key="track.id"
                    :id="track.id" :index="index + 6" :name="track.name" :image="track.image" :type="'track'"/>
                </div>
            </div>
        </div>
        <div>
            <div class="album-header">
                <label class="header">Albums</label>
                <label v-if="!albumsViewAll && albums.length > 4" class="change-view" @click="albumsViewAll = true">View All</label>
                <label v-else-if="albums.length > 4" class="change-view" @click="albumsViewAll = false">View Less</label>
            </div>
            <div v-if="!albumsViewAll" class="albums">
                <ArtistAlbum v-for="album in albums.slice(0, 4)" :key="album.id"
                :id="album.id" :name="album.name" :image="album.image"/>
            </div>
            <div v-else class="albums">
                <ArtistAlbum v-for="album in albums" :key="album.id"
                :id="album.id" :name="album.name" :image="album.image"/>
            </div>
        </div>
        <div>
            <div class="album-header">
                <label class="header">Singles & EP's</label>
                <label v-if="!singlesViewAll && singles.length > 4" class="change-view" @click="singlesViewAll = true">View All</label>
                <label v-else-if="singles.length > 4" class="change-view" @click="singlesViewAll = false">View Less</label>
            </div>
            <div v-if="!singlesViewAll" class="albums">
                <ArtistAlbum v-for="single in singles.slice(0, 4)" :key="single.id"
                :id="single.id" :name="single.name" :image="single.image"/>
            </div>
            <div v-else class="albums">
                <ArtistAlbum v-for="single in singles" :key="single.id"
                :id="single.id" :name="single.name" :image="single.image"/>
            </div>
        </div>
    </div>
</template>
<script>
import PopularTrack from '../components/home_components/PopularItem.vue'
import ArtistAlbum from '../components/artist_components/ArtistAlbum.vue'
import Spotify from '../wrappers/SpotifyWrapper'

export default {
    data() {
        return {
            id: '',
            artist: {},
            popularTracks: [],
            albums: [],
            singles: [],
            tracksViewAll: false,
            albumsViewAll: false,
            singlesViewAll: false
        }
    },
    components: {
        PopularTrack,
        ArtistAlbum
    },
    created() {
        this.getArtistId()
        this.getArtistInfo()
        this.getArtistPopularTracks()
        this.getArtistAlbums()
        this.getArtistSingles()
    },
    methods: {
        getArtistId(){
            this.id = this.$route.params.id
        },

        async getArtistInfo(){
            this.artist = await Spotify.getArtistInfo(this.id)
        },

        async getArtistPopularTracks(){
            this.popularTracks = await Spotify.getArtistTopTracks(this.id)
        },

        async getArtistAlbums(){
            this.albums = await Spotify.getArtistAlbums(this.id)
        },

        async getArtistSingles(){
            this.singles = await Spotify.getArtistSinglesAndEPs(this.id)
        },

        redirectToSpotify(){
            window.open(this.artist.spotify)
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

    .album-header{   
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid black;
        margin-bottom: 10px;
        align-items: flex-end;
    }

    .albums{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .change-view{
        color: var(--primary-color);
        font-size: 1.15em;
        cursor: pointer;
    }
</style>
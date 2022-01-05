<template>
    <div v-if="user.id === undefined" id="loading">
        <em class="icon fas fa-spinner"/>Loading...
    </div>
    <div v-else id="panel">
        <div id="top">
            <img src="https://www.multisignaal.nl/wp-content/uploads/2021/08/blank-profile-picture-973460_1280.png" id="profile-pic" alt=""/>
            <div id="top-right">
                <label id="title">{{ user.username }}</label>
                <button v-if="!ownProfile && !following" id="follow" @click="followUser()">Follow</button>
                <button v-if="!ownProfile && following" id="unfollow" @click="unfollowUser()">Unfollow</button>
                <!-- <label id="join-date">Joined On: {{ user.joinDate.substring(0, user.joinDate.indexOf("T")) }}</label> -->
            </div>
        </div>
        <div v-if="artists.length && albums.length && tracks.length">
            <div class="album-header"><label class="header">Favorites</label></div>
            <div id="favorites">
                <Favorite :item="favoriteArtist" :type="'Artist'"/>
                <Favorite :item="favoriteAlbum" :type="'Album'"/>
                <Favorite :item="favoriteTrack" :type="'Track'"/>
            </div>
        </div>
        <div id="mid" v-if="ownProfile && recentlyPlayed.length">
            <div class="album-header"><label class="header">Recently Played</label></div>
            <div>
                <RecentlyPlayed v-for="scrobble in recentlyPlayed" :key="scrobble.track.id"
                :id="scrobble.track.id" :name="scrobble.track.name" :image="scrobble.track.album.images[0].url" :playedAt="scrobble.played_at"/>
            </div>
        </div>
        <div v-if="artists.length && albums.length && tracks.length">
            <div class="album-header">
                <label class="header">Top Artists</label>
                <select class="change-view" @change="getScrobbledArtists(getDisplayDate(artistDate))" v-model="artistDate">
                    <option value=7>Last 7 Days</option>
                    <option value=30>Last 30 Days</option>
                    <option value=90>Last 90 Days</option>
                    <option value=180>Last 180 Days</option>
                    <option value=365>Last 365 Days</option>
                    <option value=1000 selected>All Time</option>
                </select>
            </div>
            <div class="albums">
                <ScrobbledItems :items="artists.slice(0, 5)" :type="'artist'"/>
            </div>
        </div>
        <div v-if="artists.length && albums.length && tracks.length">
            <div class="album-header">
                <label class="header">Top Albums</label>
                <select class="change-view" @change="getScrobbledAlbums(getDisplayDate(albumsDate))" v-model="albumsDate">
                    <option value=7>Last 7 Days</option>
                    <option value=30>Last 30 Days</option>
                    <option value=90>Last 90 Days</option>
                    <option value=180>Last 180 Days</option>
                    <option value=365>Last 365 Days</option>
                    <option value=1000 selected>All Time</option>
                </select>
            </div>
            <div class="albums">
                <ScrobbledItems :items="albums.slice(0, 5)" :type="'album'"/>
            </div>
        </div>
        <div v-if="artists.length && albums.length && tracks.length">
            <div class="album-header">
                <label class="header">Top Tracks</label>
                <select class="change-view" @change="getScrobbledTracks(getDisplayDate(tracksDate))" v-model="tracksDate">
                    <option value=7>Last 7 Days</option>
                    <option value=30>Last 30 Days</option>
                    <option value=90>Last 90 Days</option>
                    <option value=180>Last 180 Days</option>
                    <option value=365>Last 365 Days</option>
                    <option value=1000 selected>All Time</option>
                </select>
            </div>
            <div class="albums">
                <ScrobbledItems :items="tracks.slice(0, 5)" :type="'track'"/>
            </div>
        </div>
    </div>
</template>
<script>
import Favorite from '../components/profile_components/Favorite.vue'
import RecentlyPlayed from '../components/profile_components/RecentlyPlayed.vue'
import ScrobbledItems from '../components/profile_components/ScrobbledItems.vue'
import ProfileWrapper from '../wrappers/ProfileWrapper'
import SpotifyWrapper from '../wrappers/SpotifyWrapper'
import ScrobbleWrapper from '../wrappers/ScrobbleWrapper'
import JwtUtil from '../utils/JwtUtil'

export default {
    data(){
        return {
            ownProfile: false,
            following: false,
            id: '',
            user: {},
            currentUser: {},
            recentlyPlayed: [],
            artists: [],
            favoriteArtist: null,
            artistDate: 1000,
            albums: [],
            favoriteAlbum: null,
            albumsDate: 1000,
            tracks: [],
            favoriteTrack: null,
            tracksDate: 1000
        }
    },
    components: {
        Favorite,
        RecentlyPlayed,
        ScrobbledItems
    },
    async created(){
        this.getUserId()
        this.getProfile()
        this.getRecentlyPlayed()
        this.getScrobbledArtists(new Date('2021-01-01T00:00:00Z'))
        this.getScrobbledAlbums(new Date('2021-01-01T00:00:00Z'))
        this.getScrobbledTracks(new Date('2021-01-01T00:00:00Z'))
        await this.getUser()
        this.getUserInfo()
    },
    methods: {
        getUserId(){
            this.id = this.$route.params.id
        },
        async getProfile(){
            const response = await ProfileWrapper.getProfileById(this.id)
            this.user = response.profile
        },
        async getUser(){
            const jwt = localStorage.getItem('jwt')
            const claims = JwtUtil.parseJwt(jwt)
            const id = claims.sub

            const response = await ProfileWrapper.getProfileById(id)
            this.currentUser = response.profile
        },
        getUserInfo(){
            if(this.currentUser.id === this.id){
                this.ownProfile = true
            }

            if(this.currentUser.following.some(i => i === this.id)){
                this.following = true
            }
            console.log(this.ownProfile)
            console.log(this.following)
        },
        async getRecentlyPlayed(){
            const current = await SpotifyWrapper.getCurrentlyPlaying()

            if(current !== null){
                this.recentlyPlayed = await SpotifyWrapper.getRecentlyPlayed(9)
                this.recentlyPlayed.unshift({ track: current, played_at: 'Playing Now'})
            }
            else{
                this.recentlyPlayed = await SpotifyWrapper.getRecentlyPlayed(10)
            }
        },
        async getScrobbledArtists(from){
            const response = await ScrobbleWrapper.getUserScrobbledArtists(this.id, this.dateToYYYYMMDD(from), this.dateToYYYYMMDD(new Date(new Date().setDate(new Date().getDate() + 1))))

            if(this.favoriteArtist === null && response.artists.length){
                this.favoriteArtist = response.artists[0].artist
            }

            this.artists = response.artists
        },
        async getScrobbledAlbums(from){
            const response = await ScrobbleWrapper.getUserScrobbledAlbums(this.id, this.dateToYYYYMMDD(from), this.dateToYYYYMMDD(new Date(new Date().setDate(new Date().getDate() + 1))))

            if(this.favoriteAlbum === null && response.albums.length){
                this.favoriteAlbum = response.albums[0].album
            }

            this.albums = response.albums
        },
        async getScrobbledTracks(from){
            const response = await ScrobbleWrapper.getUserScrobbledTracks(this.id, this.dateToYYYYMMDD(from), this.dateToYYYYMMDD(new Date(new Date().setDate(new Date().getDate() + 1))))

            if(this.favoriteTrack === null && response.tracks.length){
                this.favoriteTrack = response.tracks[0].track
            }

            this.tracks = response.tracks
        },
        getDisplayDate(d){
            return new Date(new Date().setDate(new Date().getDate() - d))
        },
        dateToYYYYMMDD(d) {
            return d && new Date(d.getTime()-(d.getTimezoneOffset()*60*1000)).toISOString().split('T')[0]
        },
        followUser(){
            this.following = true;
            ProfileWrapper.followUser(this.id)
        },
        unfollowUser(){
            this.following = false;
            ProfileWrapper.unfollowUser(this.id)
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
        border: 1px solid var(--primary-color);
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

    #join-date{    
        padding: 5px 0px;
        color: var(--primary-color);
        font-family: inherit;
        font-size: 1.5em;
        display: flex;
        align-items: center;
    }

    #follow{    
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

        #follow:hover{
            transform: scale(1.05);
            box-shadow: 3px 3px 5px 0px rgb(0 0 0 / 50%);
            cursor: pointer;
        }

    #unfollow{    
        padding: 5px 20px;
        color: var(--secondary-color);
        border-radius: 5px;
        border: none;
        background-color: var(--primary-color);
        font-family: inherit;
        font-size: 1.5em;
        display: flex;
        align-items: center;
        transition: 0.2s ease transform;
    }

        #unfollow:hover{
            transform: scale(1.05);
            box-shadow: 3px 3px 5px 0px rgb(0 0 0 / 50%);
            cursor: pointer;
        }

    #favorites{
        display: flex;
        justify-content: space-between;
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
        background-color: var(--primary-color);
        border-radius: 5px;
        border: none;
        outline: none;
        color: var(--text-color);
        font-family: inherit;
        font-size: 1.15em;
        cursor: pointer;
    }

    #loading{
        font-size: 4em;
        color: var(--secondary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: calc(100vh - 75px);
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
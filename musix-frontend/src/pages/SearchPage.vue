<template>
    <div id="panel">
        <div id="navbar">
            <h1 :class="this.searchType === 'artist' ? 'nav-item-selected' : 'nav-item'" @click="selectSearchType('artist')">Artists</h1>
            <h1 :class="this.searchType === 'album' ? 'nav-item-selected' : 'nav-item'" @click="selectSearchType('album')">Albums</h1>
            <h1 :class="this.searchType === 'track' ? 'nav-item-selected' : 'nav-item'" @click="selectSearchType('track')">Tracks</h1>
            <h1 :class="this.searchType === 'user' ? 'nav-item-selected' : 'nav-item'" @click="selectSearchType('user')">Users</h1>
        </div>
        <div id="search">
            <h1 id="search-text">Results for <strong>"{{ this.search }}"</strong>:</h1>
            <div v-if="this.searchType === 'artist' && !this.isSearching" id="search-results">
                <Artist v-for="artist in results" :key="artist.id"
                :id="artist.id" :name="artist.name" :image="artist.images.length ? artist.images[artist.images.length - 1].url : undefined" :genres="artist.genres"/>
            </div>
            <div v-if="this.searchType === 'album' && !this.isSearching" id="search-results">
                <Album v-for="album in results" :key="album.id"
                :id="album.id" :name="album.name" :image="album.images.length ? album.images[album.images.length - 1].url : undefined" :artists="album.artists.map(i => i.name)"/>
            </div>
            <div v-if="this.searchType === 'track' && !this.isSearching" id="search-results">
                <Track v-for="track in results" :key="track.id"
                :id="track.id" :name="track.name" :image="track.album.images.length ? track.album.images[track.album.images.length - 1].url : undefined" :artists="track.artists.map(i => i.name)"/>
            </div>
            <div v-if="this.searchType === 'user' && !this.isSearching" id="search-results">
                <User v-for="user in results.slice((page - 1) * 12, page * 12)" :key="user.id"
                :id="user.id" :name="user.username" :image="user.image" :joinDate="new Date(user.joinDate)"/>
            </div>
            <div id="search-pages">
                <em @click="this.page !== 1 ? changePage(false) : null" :class="this.page !== 1 ? 'page-direction fas fa-angle-left' : 'fas fa-angle-left'" />
                <label id="search-page">{{ this.page }}</label>
                <em @click="this.page + 1 <= this.maxPages ? changePage(true) : null" :class="this.page + 1 <= this.maxPages ? 'page-direction fas fa-angle-right' : 'fas fa-angle-right'" />
            </div>
        </div>
    </div>
</template>
<script>
import Artist from '../components/search_components/Artist.vue'
import Album from '../components/search_components/Album.vue'
import Track from '../components/search_components/Track.vue'
import User from '../components/search_components/User.vue'
import SpotifyWrapper from '../wrappers/SpotifyWrapper'
import ProfileWrapper from '../wrappers/ProfileWrapper'

export default {
    data() {
        return {
            search: '',
            searchType: 'artist',
            results: [],
            page: 1,
            maxPages: 1,
            isSearching: false
        }
    },
    components: {
        Artist, 
        Album,
        Track,
        User
    },
    async created() {
        this.getSearch()
        await this.getSearchResults()
    },
    methods: {
        getSearch(){
            this.search = this.$route.params.search
        },
        async getSearchResults(){
            if(this.searchType === 'user'){
                const response = await ProfileWrapper.getProfilesBySearchQuery(this.search)
                
                if(response.success){
                    this.results = response.profiles
                    this.maxPages = Math.ceil(response.profiles.length / 12)
                }
                else{
                    alert('Something went wrong, please try again later.')
                }
            }
            else{
                const response = await SpotifyWrapper.getSearchResults(this.search, this.searchType, this.page)
                
                if(response.success){
                    this.results = response.items
                    this.maxPages = Math.ceil(response.total / 12)
                }
                else{
                    alert('Something went wrong, please try again later.')
                }
            }
        },
        async selectSearchType(searchType){
            if(this.searchType === searchType){
                return
            }

            this.switchSearchingStatus()
            this.searchType = searchType
            this.page = 1
            await this.getSearchResults()
            this.switchSearchingStatus()
        },
        async changePage(goOnePageUp){
            if(goOnePageUp){
                this.page++
            }
            else{
                this.page--
            }

            await this.getSearchResults()
        },
        switchSearchingStatus(){
            this.isSearching = !this.isSearching;
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
        width: 80vw;
        height: 80vh;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.75);
        display: flex;
        flex-direction: column;
    }

    #navbar{
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: flex-start;
        justify-items: center;
        border-bottom: 1px solid var(--text-color);
    }

    .nav-item{
        margin: 10px 0px 10px 25px;
        color: var(--text-color);
        font-weight: normal; 
    }

        .nav-item:hover{
            cursor: pointer;
            color: var(--primary-color); 
        }

    .nav-item-selected{
        margin: 10px 0px 10px 25px;
        color: var(--primary-color);
        font-weight: normal; 
        cursor: pointer;
    }

    #search{
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        height: 100%;
    }

    #search-text{
        margin: 0;
        color: var(--text-color);
        font-weight: normal; 
    }

    #search-results{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        height: 80%;
        width: 100%;
        align-items: center;
        overflow-y: overlay;
    }

    #search-pages{
        width: 100%;
        display: flex;
        justify-content: center;
        color: var(--text-color);
        font-size: 1.5em;
        align-items: center;
    }

    #search-page{
        margin: 0px 10px;
    }

    .page-direction:hover{
        cursor: pointer;
        color: var(--primary-color);
    }
</style>
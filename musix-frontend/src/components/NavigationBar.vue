<template>
    <div class="navigation-bar">
        <div class="nav-side">
            <span class="logo fa-stack fa-2x" @click="redirectToPage('/home')">
                <em class="logo-back fas fa-square fa-stack-2x" />
                <em class="logo-front fas fa-compact-disc fa-stack-1x" />
            </span>
            <h1 class="title">MusiX</h1>
        </div>
        <div class="nav-side">
            <form @submit="handleSearch">
                <input class="search" v-model="search" placeholder="Search..."/>
            </form>
            <div v-if="isUserLoggedIn()">
                <label class="nav-option" @click="redirectToPage(`/profile/${getUserId()}`)">Profile</label>
                <label class="nav-option" @click="handelLogOut()">Log Out</label>
            </div>
            <div v-else>
                <label class="nav-option" @click="redirectToPage('/signin')">Sign In</label>
                <label class="nav-option" @click="redirectToPage('/signup')">Sign Up</label>
            </div>
        </div>
    </div>
</template>

<script>
import JwtUtil from '../utils/JwtUtil'

export default {
    name: 'NavigationBar',
    data(){
        return{
            search: '',
            userId: ''
        }
    },
    methods: {
        isUserLoggedIn(){
            return localStorage.getItem('jwt') !== null
        },
        getUserId(){
            const jwt = localStorage.getItem('jwt')
            const claims = JwtUtil.parseJwt(jwt)
            return claims.sub
        },
        handleSearch(e){
            e.preventDefault()

            this.$router.push(`/search/${this.search}`)
            this.resetValues()
        },
        handelLogOut() {
            localStorage.removeItem('jwt')
            this.$router.push('/signin')
            this.resetValues()
        },
        redirectToPage(route){
            this.$router.push(route)
            this.resetValues()
        },
        resetValues(){
            this.search = ''
        }
    }
}
</script>

<style scoped>
    .navigation-bar{
        position: absolute;
        background: rgba(0, 0, 0, 0.75);
        height: 75px;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .nav-side{
        display: flex;
        align-items: center;
    }

    .logo{
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .logo-front{
        color: var(--secondary-color);
        font-size: 1.25em;
        transition: 2s ease transform;
    }

    .logo-front:hover{
        transform: rotate(900deg);
    }

    .logo-back{
        color: var(--primary-color);
        font-size: 2em;
    }

    .title{
        font-weight: 400;
        font-style: normal;
        font-size: 3em;
        color: var(--secondary-color);
        margin: 0;
    }

    .search{
        font-family: inherit;
        margin-right: 50px;
        font-size: 1.25em;
        border: none;
        outline: none;
        border-radius: 5px;
        padding: 10px;
    }

    .nav-option{
        color: var(--secondary-color);
        margin-right: 50px;
        font-size: 1.5em;
        cursor: pointer;
    }
</style>
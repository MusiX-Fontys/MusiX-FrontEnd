import { createRouter, createWebHistory } from "vue-router"

// Import Pages
import HomePage from '../pages/HomePage'
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'
import ProfilePage from '../pages/ProfilePage'
import ArtistPage from '../pages/ArtistPage'
import AlbumPage from '../pages/AlbumPage'
import TrackPage from '../pages/TrackPage'
import SearchPage from '../pages/SearchPage'
import AuthorizationPage from '../pages/AuthorizationPage'

//Import Wrappers
import spotify from '../wrappers/SpotifyAuthenticationWrapper'
import scrobble from '../wrappers/ScrobbleWrapper'

import JwtUtil from "../utils/JwtUtil"

//Define Routes
const routes = [
    {
        path: '/',
        alias: '/home',
        name: 'home',
        component: HomePage,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUpPage,
        meta: {
            guest: true
        }
    },
    {
        path: '/signin',
        name: 'signin',
        component: SignInPage,
        meta: {
            guest: true
        }
    },
    {
        path: '/profile/:id',
        name: 'profile',
        component: ProfilePage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/artist/:id',
        name: 'artist',
        component: ArtistPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/album/:id',
        name: 'album',
        component: AlbumPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/track/:id',
        name: 'track',
        component: TrackPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/search/:search',
        name: 'search',
        component: SearchPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/authorized',
        name: 'authorized',
        component: AuthorizationPage,
        meta: {
            requiresAuth: true
        }
    }
]

//Create Router
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), 
    routes
})

//Check before entering page
router.beforeEach(async (to, from, next) => {
    const jwt = localStorage.getItem("jwt")

    //Check JWT expiration
    if(jwt != null){
        try{
            const claims = JwtUtil.parseJwt(jwt)
            const isExpired = JwtUtil.checkExpiration(claims["exp"])
    
            if(isExpired){
              localStorage.removeItem("jwt")
            }
        }
        catch{
            localStorage.removeItem("jwt")
        }
    }

    //AuthenticationState
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (jwt == null) {
        next({
          name: 'signin',
          params: { nextUrl: to.fullPath }
        })
      } 
      else {
        next()
        scrobble.updateRecentlyPlayed()
      }
    } 
    else if (to.matched.some(record => record.meta.guest)) {
      if (jwt == null) {
        next()
      } 
      else {
        next({ name: 'home' })
      }
    } 
    else {
      next()
    }

    //Check Spotify expiration
    if(await spotify.hasUserSetUpSpotifyConnection() && to.name !== 'authorized'){
        const isExpired = JwtUtil.checkExpiration(localStorage.getItem('exp_time'))

        if(isExpired){
            localStorage.removeItem('access_token')
            window.location.href = spotify.getAuthorizationUrl()
        }
    }

    //Spotify Authorization
    if(to.name === 'authorized'){
        const result = await spotify.getAccessToken(to.query.code)

        const exp_time = new Date((Date.now() + result.exp_time * 1000) / 1000)

        localStorage.setItem('access_token', result.access_token)
        localStorage.setItem('exp_time', exp_time.getTime())

        router.push('home')
    }
})

export default router
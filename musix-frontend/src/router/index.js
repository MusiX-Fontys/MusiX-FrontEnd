import { createRouter, createWebHistory } from "vue-router"

// Import Pages
import HomePage from '../pages/HomePage'
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'
import ProfilePage from '../pages/ProfilePage'
import ArtistPage from '../pages/ArtistPage'
import AlbumPage from '../pages/AlbumPage'
import SongPage from '../pages/SongPage'
import SearchPage from '../pages/SearchPage'

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
        path: '/profile',
        name: 'profile',
        component: ProfilePage,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/artist',
        name: 'artist',
        component: ArtistPage,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/album',
        name: 'album',
        component: AlbumPage,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/song',
        name: 'song',
        component: SongPage,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/search',
        name: 'search',
        component: SearchPage,
        meta: {
            requiresAuth: false
        }
    }
]

//Create Router
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), 
    routes
})

export default router
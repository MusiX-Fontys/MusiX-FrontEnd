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
    },
    }
]

//Create Router
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), 
    routes
})

//Check before entering page
router.beforeEach(async (to, from, next) => {

    //Check expiration
    if(localStorage.getItem('jwt') != null){
        try{
            const claims = parseJwt(localStorage.getItem("jwt"))
            const isExpired = checkExpiration(claims["exp"])
    
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
      if (localStorage.getItem('jwt') == null) {
        next({
          name: 'signin',
          params: { nextUrl: to.fullPath }
        })
      } 
      else {
          next()
      }
    } 
    else if (to.matched.some(record => record.meta.guest)) {
      if (localStorage.getItem('jwt') == null) {
        next()
      } 
      else {
        next({ name: 'home' })
      }
    } 
    else {
      next()
    }

})

//Get claims from JWT
function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

//Check expiration date of JWT
function checkExpiration (exp) {
  const expDate = new Date(exp * 1000)
  const currentDate = new Date()

  return expDate.getTime() <= currentDate.getTime();
}

export default router
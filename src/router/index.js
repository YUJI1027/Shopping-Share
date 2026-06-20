import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../components/Home.vue'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Profile from '../components/Profile.vue'
import GroupSettings from '../components/GroupSettings.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/', component: Home, meta: { requiresAuth: true} },
    { path: '/profile', component: Profile },
    { path: '/group/:id/setting', component: GroupSettings },
    { path: '/privacy', name: 'PrivacyPolicy', component: PrivacyPolicy }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

let isAuthChecked = false
let currentUser = null
let isAuthReady = false

onAuthStateChanged(auth, (user) => {
    currentUser = user
    isAuthReady = true
})

router.beforeEach((to, from, next) => {
    if (!isAuthReady) {
        const unwatch = onAuthStateChanged(auth, (user) => {
            currentUser = user
            isAuthChecked = true
            if (to.meta.requiresAuth && !user) {
                next('/login')
            } else {
                next()
            }
            unwatch()
        })
    } else {
        if (to.meta.requiresAuth && !currentUser) {
            next('/login')
        } else {
            next()
        }
    }
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../components/Home.vue'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Profile from '../components/Profile.vue'
import GroupSettings from '../components/GroupSettings.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import LandingPage from '../views/LandingPage.vue'


let currentUser = null
let isAuthReady = false
// let isAuthChecked = false

// ====================
// 認証状態を事前に取得
// ====================
onAuthStateChanged(auth, (user) => {
    currentUser = user
    isAuthReady = true
})

const routes = [
    {
        path: '/',
        component: LandingPage,
        beforeEnter: (to, from, next) => {
            // ログイン済みなら /home へリダイレクト
            if (currentUser) {
                next('/home')
            } else {
                next()
            }
        }
    },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/home', component: Home, meta: { requiresAuth: true} },
    { path: '/profile', component: Profile },
    { path: '/group/:id/setting', component: GroupSettings },
    { path: '/privacy', name: 'PrivacyPolicy', component: PrivacyPolicy }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (!isAuthReady) {
        const unwatch = onAuthStateChanged(auth, (user) => {
            currentUser = user
            isAuthReady = true
            if (to.meta.requiresAuth && !user) {
                // ログイン後に戻れるよう、元のURLをredirectパラメータとして渡す
                next({ path: '/login', query: { redirect: to.fullPath } })
            } else {
                next()
            }
            unwatch()
        })
    } else {
        if (to.meta.requiresAuth && !currentUser) {
            next({ path: '/login', query: { redirect: to.fullPath } })
        } else {
            next()
        }
    }
})

export default router
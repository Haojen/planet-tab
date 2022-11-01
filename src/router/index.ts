import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import HomeView from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/help',
        name: 'support',
        component: () => import('../views/Support.vue')
    },
    {
        path: '/privacy',
        name: 'policy',
        component: () => import('../views/PrivacyPolicy.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

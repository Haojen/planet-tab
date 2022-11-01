import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import HomeView from './views/Home.vue'
import { routerTargetName } from './reactiveConsts'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/help',
        name: 'help',
        component: () => import('./views/Help.vue')
    },
    {
        path: '/privacy',
        name: 'policy',
        component: () => import('./views/PrivacyPolicy.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from) => {
    console.log(to.name)
    routerTargetName.value = to.name as string
})

export default router

import {createRouter, createWebHistory} from "vue-router";
import routesNames from "./routesNames";

const routes = [
    {
        path: '/',
        name: routesNames.home.name,
        component: () => import(/* webpackChunkName: "Home" */ '../pages/Home.vue')
    },
    {
        path: '/registration',
        name: routesNames.registration.name,
        component: () => import(/* webpackChunkName: "Registration" */ '../pages/auth/Registration.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


export default router

import {createRouter, createWebHistory} from "vue-router";
import routesNames from "./routesNames";

const routes = [
    {
        path: '/',
        name: routesNames.home.name,
        component: () => import('../pages/App.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


export default router

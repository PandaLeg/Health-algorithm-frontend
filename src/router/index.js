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
    },
    {
        path: '/registration',
        name: routesNames.registration.name,
        component: () => import(/* webpackChunkName: "Registration" */ '../pages/auth/Registration.vue')
    },
    {
        path: '/registration-patient',
        name: routesNames.registrationPatient.name,
        component: () => import(/* webpackChunkName: "RegistrationPatient" */ '../pages/auth/RegistrationPatient.vue')
    },
    {
        path: '/registration-doctor',
        name: routesNames.registrationDoctor.name,
        component: () => import(/* webpackChunkName: "RegistrationDoctor" */ '../pages/auth/RegistrationDoctor.vue')
    },
    {
        path: '/login',
        name: routesNames.login.name,
        component: () => import(/* webpackChunkName: "Login" */ '../pages/auth/Login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


export default router

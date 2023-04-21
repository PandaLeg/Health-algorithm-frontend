import {createRouter, createWebHistory} from "vue-router";
import routesNames from "./routesNames";
import store from "../store";
import {vuexTypes} from "../store/vuexTypes";

const routes = [
    {
        path: '/',
        name: routesNames.home.name,
        component: () => import(/* webpackChunkName: "Home" */ '../pages/Home.vue')
    },
    {
        path: '/registration',
        name: routesNames.registration.name,
        component: () => import(/* webpackChunkName: "Registration" */ '../pages/registration/Registration.vue'),
        beforeEnter: guardUnLogIn
    },
    {
        path: '/registration-patient',
        name: routesNames.registrationPatient.name,
        component: () => import(/* webpackChunkName: "RegistrationPatient" */ '../pages/registration/RegistrationPatient.vue'),
        beforeEnter: guardUnLogIn
    },
    {
        path: '/registration-doctor',
        name: routesNames.registrationDoctor.name,
        component: () => import(/* webpackChunkName: "RegistrationDoctor" */ '../pages/registration/RegistrationDoctor.vue'),
        beforeEnter: guardUnLogIn
    },
    {
        path: '/login',
        name: routesNames.login.name,
        component: () => import(/* webpackChunkName: "Login" */ '../pages/Login.vue'),
        beforeEnter: guardUnLogIn
    }
]


function guardUnLogIn(to, from, next) {
    const isLoggedIn = store.getters[vuexTypes.isLoggedIn]

    if (isLoggedIn) {
        next({
            name: routesNames.home.name
        })
    } else {
        next()
    }
}

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


export default router

import {createRouter, createWebHistory} from "vue-router";
import routesNames from "./routesNames";
import store from "../store";
import {vuexTypes} from "../store/vuexTypes";
import {errorCodes} from "../http/errorCodes";

const routes = [
    {
        path: '/',
        name: routesNames.home.name,
        component: () => import(/* webpackChunkName: "HomePage" */ '../pages/HomePage.vue')
    },
    {
        path: '/registration',
        name: routesNames.registration.name,
        component: () => import(/* webpackChunkName: "RegistrationPage" */ '../pages/registration/RegistrationPage.vue'),
        beforeEnter: guardUnLogIn
    },
    {
        path: '/registration-patient',
        name: routesNames.registrationPatient.name,
        component: () => import(/* webpackChunkName: "RegistrationPatientPage" */ '../pages/registration/RegistrationPatientPage.vue'),
        beforeEnter: guardUnLogIn
    },
    {
        path: '/registration-doctor',
        name: routesNames.registrationDoctor.name,
        component: () => import(/* webpackChunkName: "RegistrationDoctorPage" */ '../pages/registration/RegistrationDoctorPage.vue'),
        beforeEnter: guardUnLogIn
    },
    {
        path: '/login',
        name: routesNames.login.name,
        component: () => import(/* webpackChunkName: "Login" */ '../pages/auth/LoginPage.vue'),
        beforeEnter: guardUnLogIn
    },
    {
        path: '/verify-email',
        name: routesNames.verifyEmail.name,
        component: () => import(/* webpackChunkName: "VerifyEmailPage" */ '../pages/auth/VerifyEmailPage.vue'),
        beforeEnter: checkVerifyParams
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

function checkVerifyParams(to, from, next) {
    const errorCode = to.query.code
    const email = to.query.email
    const paramsExists = Object.keys(to.query).length !== 0
    const isValidParams = paramsExists && email && errorCode && errorCodes[errorCode]

    if (isValidParams || !paramsExists) {
        next()
    } else {
        next({
            name: routesNames.home.name
        })
    }
}

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


export default router

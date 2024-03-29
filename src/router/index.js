import {createRouter, createWebHistory} from "vue-router";
import routesNames from "./routes-names";
import store from "../store";
import {vuexTypes} from "../store/vuex-types";
import {errorCodes} from "../http/error-codes";

const routes = [
    {
        path: '/',
        name: routesNames.home.name,
        component: () => import(/* webpackChunkName: "HomePage" */ '../pages/HomePage.vue')
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
        path: '/registration-clinic',
        name: routesNames.registrationClinic.name,
        component: () => import(/* webpackChunkName: "RegistrationClinicPage" */ '../pages/registration/RegistrationClinicPage.vue'),
        beforeEnter: guardUnLogIn
    },
    {
        path: '/login',
        name: routesNames.login.name,
        component: () => import(/* webpackChunkName: "LoginPage" */ '../pages/auth/LoginPage.vue'),
        beforeEnter: guardUnLogIn
    },
    {
        path: '/verify-email',
        name: routesNames.verifyEmail.name,
        component: () => import(/* webpackChunkName: "VerifyEmailPage" */ '../pages/auth/VerifyEmailPage.vue'),
        beforeEnter: checkVerifyParams
    },
    {
        path: '/forgot-password',
        name: routesNames.forgotPassword.name,
        component: () => import(/* webpackChunkName: "ForgotPasswordPage" */ '../pages/auth/ForgotPasswordPage.vue'),
        beforeEnter: guardUnLogIn
    },
    {
        path: '/reset-password/:id',
        name: routesNames.resetPassword.name,
        component: () => import(/* webpackChunkName: "ResetPasswordPage" */ '../pages/auth/ResetPasswordPage.vue'),
        beforeEnter: checkResetCode,
        params: true
    },
    {
        path: '/doctors',
        name: routesNames.doctors.name,
        component: () => import(/* webpackChunkName: "DoctorsPage" */ '../pages/doctor/DoctorsPage.vue')
    },
    {
        path: '/doctors/:id',
        name: routesNames.doctor.name,
        component: () => import(/* webpackChunkName: "DoctorPage" */ '../pages/doctor/DoctorPage.vue'),
        params: true
    },
    {
        path: '/clinics',
        name: routesNames.clinics.name,
        component: () => import(/* webpackChunkName: "ClinicsPage" */ '../pages/clinic/ClinicsPage.vue'),
    },
    {
        path: '/clinics/:id',
        name: routesNames.clinic.name,
        component: () => import(/* webpackChunkName: "ClinicPage" */ '../pages/clinic/ClinicPage.vue'),
        params: true
    },
    {
        path: '/appointments',
        name: routesNames.appointment.name,
        component: () => import(/* webpackChunkName: "AppointmentPage" */ '../pages/appointment/AppointmentPage.vue'),
        beforeEnter: guardLogIn
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

function guardLogIn(to, from, next) {
    const isLoggedIn = store.getters[vuexTypes.isLoggedIn]

    if (isLoggedIn) {
        next()
    } else {
        next({
            name: routesNames.home.name
        })
    }
}

function checkResetCode(to, from, next) {
    const code = to.query?.code
    const paramExists = Object.keys(to.query).length !== 0
    const isValidParam = paramExists && code

    if (isValidParam) {
        guardUnLogIn(to, from, next)
    } else {
        next({
            name: routesNames.home.name
        })
    }
}

function checkVerifyParams(to, from, next) {
    const errorCode = to.query?.code
    const email = to.query?.email
    const paramsExists = Object.keys(to.query).length !== 0
    const isValidParams = paramsExists && email && errorCode && errorCodes[errorCode]

    if (isValidParams) {
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

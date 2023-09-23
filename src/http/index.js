import axios from "axios";
import {config} from "../util/config";
import {vuexTypes} from "../store/vuex-types";
import routesNames from "../router/routes-names";
import handleAuthInfo from "./handle-auth-info";
import store from "../store";
import router from "../router";

const authAxios = axios.create({
    withCredentials: true,
    baseURL: config.apiUrl
})

authAxios.interceptors.request.use((config) => {
    const accessToken = store.getters[vuexTypes.token]

    config.headers['Authorization'] = 'Bearer ' + accessToken
    return config
})

authAxios.interceptors.response.use((config) => {
    return config
}, async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true

        try {
            const url = config.apiUrl + '/auth/refresh'
            const response = await axios.put(url, {}, {withCredentials: true})
            const data = response.data

            handleAuthInfo(data)

            return authAxios.request(originalRequest)
        } catch (err) {
            store.commit(vuexTypes.CLEAR_ALL_DATA)
            router.push({name: routesNames.login.name})
        }
    }
    return Promise.reject(error)
})

export default authAxios

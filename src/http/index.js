import axios from "axios";
import {config} from "../util/config";
import store from "../store";
import {vuexTypes} from "../store/vuexTypes";
import router from "../router";
import routesNames from "../router/routesNames";

const authAxios = axios.create({
    withCredentials: true,
    baseURL: config.apiUrl
})

authAxios.interceptors.request.use((config) => {
    const accessToken = store.getters[vuexTypes.token]

    console.log(store.getters)
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

            store.commit(vuexTypes.UPDATE_USER_AUTH, data.accessToken)

            return authAxios.request(originalRequest)
        } catch (err) {
            store.commit(vuexTypes.CLEAR_ALL_DATA)
            await router.push({name: routesNames.login.name})
        }
    }
})

export default authAxios

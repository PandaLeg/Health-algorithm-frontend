import {vuexTypes} from "../vuex-types";
import axios from "axios";
import {config} from "../../util/config";
import authAxios from "../../http";
import handleAuthInfo from "../../http/handle-auth-info";

export const defaultState = () => ({
    isLoggedIn: false,
    token: '',
    isAdmin: false
})

export const authModule = {
    state: defaultState,
    mutations: {
        [vuexTypes.UPDATE_USER_AUTH](state, authInfo) {
            state.isLoggedIn = true
            state.token = authInfo.accessToken
            state.isAdmin = authInfo.isAdmin
        }
    },
    actions: {
        async [vuexTypes.REGISTER_USER]({}, user) {
            try {
                const url = config.apiUrl + '/auth/registration'

                return await axios.post(url, user, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            } catch (err) {
                return Promise.reject(err.response)
            }
        },

        async [vuexTypes.LOGIN]({commit}, user) {
            try {
                const url = config.apiUrl + '/auth/login'

                const response = await axios.post(url, user, {withCredentials: true})
                const data = response.data

                handleAuthInfo(data)

                return Promise.resolve()
            } catch (err) {
                return Promise.reject(err.response)
            }
        },

        async [vuexTypes.LOGOUT]({commit}) {
            try {
                const url = '/auth/logout'

                await authAxios.delete(url);

                commit(vuexTypes.CLEAR_ALL_DATA)

                return Promise.resolve()
            } catch (err) {
                return Promise.reject(err.response);
            }
        },

        async [vuexTypes.SEND_CONFIRMATION]({commit}, email) {
            try {
                const url = config.apiUrl + '/auth/send-confirmation-by-email'

                await axios.patch(url, {email});

                return Promise.resolve()
            } catch (err) {
                return Promise.reject(err.response);
            }
        },

        async [vuexTypes.SEND_RESET_CODE]({commit}, email) {
            try {
                const url = config.apiUrl + '/auth/send-reset-code'

                await axios.patch(url, {email});

                return Promise.resolve()
            } catch (err) {
                return Promise.reject(err.response);
            }
        },

        async [vuexTypes.RESET_PASSWORD]({commit}, data) {
            try {
                const url = config.apiUrl + '/auth/reset-password'

                await axios.patch(url, data);

                return Promise.resolve()
            } catch (err) {
                return Promise.reject(err.response);
            }
        }
    },
    getters: {
        [vuexTypes.isLoggedIn]: (state) => state.isLoggedIn,
        [vuexTypes.isAdmin]: (state) => state.isAdmin,
        [vuexTypes.token]: (state) => state.token
    }
}

import {vuexTypes} from "../vuexTypes";
import axios from "axios";
import {config} from "../../util/config";
import authAxios from "../../http";

export const defaultState = () => ({
    isLoggedIn: false,
    token: '',
})

export const authModule = {
    state: defaultState,
    mutations: {
        [vuexTypes.UPDATE_USER_AUTH](state, accessToken) {
            state.isLoggedIn = true
            state.token = accessToken
        }
    },
    actions: {
        async [vuexTypes.REGISTER_USER]({}, user) {
            try {
                const url = config.apiUrl + '/auth/registration'

                return await axios.post(url, user)
            } catch (err) {
                return Promise.reject(err)
            }
        },

        async [vuexTypes.LOGIN]({commit}, user) {
            try {
                const url = config.apiUrl + '/auth/login'

                const response = await axios.post(url, user, {withCredentials: true})
                const data = response.data

                commit(vuexTypes.UPDATE_USER_AUTH, data.accessToken)
                commit(vuexTypes.UPDATE_USER_INFO, data.user)

                return Promise.resolve()
            } catch (err) {
                return Promise.reject(err)
            }
        },

        async [vuexTypes.LOGOUT]({commit}) {
            try {
                const url = '/auth/logout'

                await authAxios.delete(url);

                commit(vuexTypes.CLEAR_ALL_DATA)

                return Promise.resolve()
            } catch (err) {
                return Promise.reject(err);
            }
        },

        async [vuexTypes.SEND_CONFIRMATION]({commit}, email) {
            try {
                const url = config.apiUrl + '/auth/send-confirmation-by-email'

                await axios.patch(url, {email});

                return Promise.resolve()
            } catch (err) {
                return Promise.reject(err);
            }
        }
    },
    getters: {
        [vuexTypes.isLoggedIn]: (state) => state.isLoggedIn,
        [vuexTypes.token]: (state) => state.token
    }
}

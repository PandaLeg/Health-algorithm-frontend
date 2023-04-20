import {vuexTypes} from "../vuexTypes";
import axios from "axios";
import {config} from "../../util/config";

export const defaultState = () => ({
    state: () => ({})
})

export const authModule = {
    state: defaultState,
    mutations: {},
    actions: {
        async [vuexTypes.REGISTER_USER] ({}, user) {
            try {
                const url = config.apiUrl + '/auth/registration'

                return await axios.post(url, user)
            } catch (err) {
                return Promise.reject(err)
            }
        }
    },
    getters: {}
}

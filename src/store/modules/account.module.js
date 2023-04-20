import {vuexTypes} from "../vuexTypes";

export const defaultState = () => ({
    user: {
        id: '',
        email: '',
        phone: ''
    }
})

export const accountModule = {
    state: defaultState,
    mutations: {
        [vuexTypes.UPDATE_USER_INFO] (state, user) {
            state.user.id = user.id
            state.user.email = user.email
            state.user.phone = user.phone
        }
    },
    actions: {},
    getters: {}
}

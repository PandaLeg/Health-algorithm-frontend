import {vuexTypes} from "../vuex-types";

export const defaultState = () => ({
    user: {
        id: '',
        email: '',
        phone: '',
        roles: [],
    }
})

export const accountModule = {
    state: defaultState,
    mutations: {
        [vuexTypes.UPDATE_USER_INFO] (state, user) {
            state.user.id = user.id
            state.user.email = user.email
            state.user.phone = user.phone
            state.user.roles = user.roles
        }
    },
    actions: {},
    getters: {
        [vuexTypes.user]: (state) => state.user,
    }
}

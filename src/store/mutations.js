import {vuexTypes} from "./vuex-types";
import replaceState from "./replace-state";

export const mutations = {
    [vuexTypes.CLEAR_ALL_DATA](state) {
        replaceState(state)
    },

    [vuexTypes.UPDATE_NOTIFICATION] (state, message) {
        state.notification = message;
    },

    [vuexTypes.SET_MOUNTED_STATE] (state, isMounted) {
        state.isMounted = isMounted;
    }
}

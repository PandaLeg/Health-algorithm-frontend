import {vuexTypes} from "./vuexTypes";
import replaceState from "./replaceState";

export const mutations = {
    [vuexTypes.CLEAR_ALL_DATA](state) {
        replaceState(state)
    },

    [vuexTypes.UPDATE_NOTIFICATION] (state, message) {
        state.notification = message;
    }
}

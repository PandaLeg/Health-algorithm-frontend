import {vuexTypes} from "./vuex-types";

export const getters = {
    [vuexTypes.notification]: (state) => state.notification
}

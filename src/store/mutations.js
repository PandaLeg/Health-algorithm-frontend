import {vuexTypes} from "./vuexTypes";
import replaceState from "./replaceState";

export const mutations = {
    [vuexTypes.CLEAR_ALL_DATA](state) {
        replaceState(state)
    }
}

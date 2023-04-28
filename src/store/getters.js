import {vuexTypes} from "./vuexTypes";

export const getters = {
    [vuexTypes.notification]: (state) => state.notification
}

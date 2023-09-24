import {vuexTypes} from "../store/vuex-types";
import store from "../store";

export default function (data) {
    const user = data.user
    const isAdmin = user.roles.some(el => el === 'ADMIN');
    const authInfo = {
        accessToken: data.accessToken,
        isAdmin
    }

    store.commit(vuexTypes.UPDATE_USER_AUTH, authInfo)
    store.commit(vuexTypes.UPDATE_USER_INFO, user)
}

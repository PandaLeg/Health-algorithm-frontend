import {STORAGE_KEY} from "../util/config";
import {vuexTypes} from "./vuexTypes";

const localStoragePlugin = store => {

    store.subscribe((mutation, state) => {
        const authModule = {
            isLoggedIn: state.authModule.isLoggedIn,
            token: state.authModule.token
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify({...state, authModule}))

        if (mutation.type === vuexTypes.CLEAR_ALL_DATA) {
            localStorage.removeItem(STORAGE_KEY)
        }
    })
}

const setState = store => {
    const oldState = JSON.parse(localStorage.getItem(STORAGE_KEY))

    if (oldState) {
        const user = oldState.accountModule.user
        const isAdmin = user.roles.some(el => el === 'ADMIN');

        store.state.authModule.isLoggedIn = oldState.authModule.isLoggedIn
        store.state.authModule.isAdmin = isAdmin
        store.state.authModule.token = oldState.authModule.token
        store.state.accountModule.user = user
    }
}

export default [localStoragePlugin, setState]

import {STORAGE_KEY} from "../util/config";
import {vuexTypes} from "./vuexTypes";

const localStoragePlugin = store => {

    store.subscribe((mutation, state) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))

        if (mutation.type === vuexTypes.CLEAR_ALL_DATA) {
            console.log('CLEAR ALL DATA')
            localStorage.removeItem(STORAGE_KEY)
        }
    })
}

const setState = store => {
    const oldState = JSON.parse(localStorage.getItem(STORAGE_KEY))

    if (oldState) {
        store.state.authModule.isLoggedIn = oldState.authModule.isLoggedIn
        store.state.authModule.token = oldState.authModule.token
        store.state.accountModule.user = oldState.accountModule.user
    }
}

export default [localStoragePlugin, setState]

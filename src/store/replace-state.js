import store from "./index";
import {defaultState as authState} from "./modules/auth.module";
import {defaultState as accountState} from "./modules/account.module";

import cloneDeep from 'lodash/cloneDeep'

export default function (state) {
    const currentState = cloneDeep(state)
    const newState = Object.assign(currentState, {
        authModule: authState(),
        accountModule: accountState()
    })
    store.replaceState(newState)
}

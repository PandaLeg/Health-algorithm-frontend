import store from "./index";
import {defaultState as authState} from "./modules/auth.module";
import {defaultState as accountState} from "./modules/account.module";

import _ from 'lodash'

export default function (state) {
    const currentState = _.cloneDeep(state)
    const newState = Object.assign(currentState, {
        authModule: authState(),
        accountModule: accountState()
    })
    store.replaceState(newState)
}

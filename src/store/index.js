import {createStore} from "vuex";
import {authModule} from "./modules/auth.module";
import {accountModule} from "./modules/account.module";
import plugins from "./plugins";
import {state} from "./state";
import {mutations} from "./mutations";
import {getters} from "./getters";

const store = createStore({
    state,
    mutations,
    actions: {},
    getters,
    modules: {
        authModule,
        accountModule
    },
    plugins
})

export default store

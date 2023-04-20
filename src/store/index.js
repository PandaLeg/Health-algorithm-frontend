import {createStore} from "vuex";
import {authModule} from "./modules/auth.module";
import {accountModule} from "./modules/account.module";
import plugins from "./plugins";
import {mutations} from "./mutations";

const store = createStore({
    state: () => ({}),
    mutations,
    actions: {},
    getters: {},
    modules: {
        authModule,
        accountModule
    },
    plugins
})

export default store

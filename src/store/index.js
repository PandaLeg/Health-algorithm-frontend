import {createStore} from "vuex";
import {authModule} from "./modules/auth.module";

const store = createStore({
    state: () => ({}),
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        authModule
    }
})

export default store

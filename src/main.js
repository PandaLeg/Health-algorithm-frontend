import {createApp} from "vue";
import App from "./pages/App.vue";
import router from "./router";
import store from "./store";


const vm = createApp(App)
    .use(router)
    .use(store)

vm.mount('#app')

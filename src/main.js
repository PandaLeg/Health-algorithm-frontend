import {createApp} from "vue";
import App from "./pages/App.vue";
import router from "./router";

const vm = createApp(App)
    .use(router)

vm.mount('#app')

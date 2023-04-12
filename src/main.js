import {createApp} from "vue";
import App from "./pages/App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";


const vm = createApp(App)
    .use(router)
    .use(vuetify)

vm.mount('#app')

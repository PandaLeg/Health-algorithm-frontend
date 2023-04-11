import {createApp} from "vue";
import App from "./pages/App.vue";
import router from "./router";

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives
})

const vm = createApp(App)
    .use(router)
    .use(vuetify)

vm.mount('#app')

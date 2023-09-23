import {createApp} from "vue";
import App from "./pages/App.vue";
import router from "./router";
import store from "./store";

// Check that service workers are supported
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
    })
}

const vm = createApp(App)
    .use(router)
    .use(store)

vm.mount('#app')

<template>
    <div>
        <div
                v-if="!isAdmin"
                class="wrapper"
        >
            <TheNavbar/>
            <main class="page">
                <VNotification/>
                <router-view></router-view>
            </main>
            <TheFooter/>
        </div>
        <div
                v-else
                class="wrapper"
        >
            <TheSidebar/>
            <main class="admin-page">
                <VNotification/>
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import {vuexTypes} from "../store/vuexTypes";
import {defineAsyncComponent} from "vue";
import TheNavbar from "../components/navigation/TheNavbar.vue";
import TheFooter from "../components/navigation/TheFooter.vue";
import VNotification from "../components/custom/VNotification.vue";

export default {
    name: "App",
    components: {
        TheNavbar,
        TheFooter,
        TheSidebar: defineAsyncComponent(() =>
            import('../components/navigation/TheSidebar.vue')
        ),
        VNotification,
    },
    computed: {
        ...mapGetters({isAdmin: vuexTypes.isAdmin})
    }
}
</script>

<style lang="scss">
@import "/src/assets/scss/style.scss";

#app {
  min-height: 100%;
  position: relative;
}

</style>

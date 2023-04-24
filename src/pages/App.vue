<template>
    <div class="wrapper">
        <TheNavbar/>
        <main class="page">
            <VNotification />
            <router-view></router-view>
        </main>
        <TheFooter/>
    </div>
</template>

<script>
import TheNavbar from "../components/navigation/TheNavbar.vue";
import TheFooter from "../components/navigation/TheFooter.vue";
import VNotification from "../components/custom/VNotification.vue";

export default {
    name: "App",
    components: {
        TheNavbar,
        TheFooter,
        VNotification
    }
}
</script>

<style lang="scss">
@import "src/assets/scss/variables.scss";
@import "/src/assets/scss/style.scss";

#app {
  min-height: 100%;
  position: relative;
}

</style>

<template>
    <div class="wrapper">
        <TheNavbar />
        <main class="page">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import TheNavbar from "../components/navbar/TheNavbar.vue";

export default {
    name: "App",
    components: {
        TheNavbar
    }
}
</script>

<style lang="scss">
@import "/src/assets/scss/style.scss";
</style>

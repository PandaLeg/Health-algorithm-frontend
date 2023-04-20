<template>
    <div class="wrapper">
        <TheNavbar/>
        <main class="page">
            <router-view></router-view>
        </main>
        <TheFooter/>
    </div>
</template>

<script>
import TheNavbar from "../components/navbar/TheNavbar.vue";
import TheFooter from "../components/footer/TheFooter.vue";

export default {
    name: "App",
    components: {
        TheNavbar,
        TheFooter
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

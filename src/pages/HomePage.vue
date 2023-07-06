<template>
    <div class="home">
        Welcome!
    </div>
</template>

<script>
import regMountedState from "../hooks/reg-mounted-state.hook";

export default {
    name: "HomePage",
    setup() {
        regMountedState()
    }
}
</script>

<style scoped>
.home {
    height: 100%;
}
</style>

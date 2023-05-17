<template>
    <div>
        <h1>Welcome to the App!</h1>
    </div>
</template>

<script>
import regMountedState from "../hooks/regMountedState";

export default {
    name: "HomePage",
    setup() {
        regMountedState()
    }
}
</script>

<style scoped>

</style>

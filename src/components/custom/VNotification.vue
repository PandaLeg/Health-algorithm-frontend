<template>
    <v-snack-bar v-model="snackbar">
        {{ notification }}
    </v-snack-bar>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {vuexTypes} from "../../store/vuex-types";
import VSnackBar from "./VSnackBar.vue";

export default {
    name: "VNotification",
    components: {
        VSnackBar
    },
    data() {
        return {
            snackbar: false
        }
    },
    computed: {
        ...mapGetters([vuexTypes.notification])
    },
    watch: {
        notification(value) {
            if (value) {
                this.openSnackbar();
                setTimeout(() => this.updateNotification(''), 4000)
            }
        }
    },
    methods: {
        ...mapMutations({
            updateNotification: vuexTypes.UPDATE_NOTIFICATION
        }),
        openSnackbar() {
            this.snackbar = true
        }
    }
}
</script>

<style scoped>

</style>

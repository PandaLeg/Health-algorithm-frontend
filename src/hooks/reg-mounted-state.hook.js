import {useStore} from "vuex";
import {onMounted, onUnmounted} from "vue";
import {vuexTypes} from "../store/vuex-types";

export default function () {
    const store = useStore()

    onMounted(() => {
        store.commit(vuexTypes.SET_MOUNTED_STATE, true)
    })
    onUnmounted(() => {
        store.commit(vuexTypes.SET_MOUNTED_STATE, false)
    })
}

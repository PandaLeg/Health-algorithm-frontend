import {computed, ref} from "vue";
import {useStore} from "vuex";
import {vuexTypes} from "../../store/vuexTypes";

export default function () {
    const isActive = ref(false)
    const activeClass = computed(() => ({
        active: isActive.value
    }))

    const store = useStore()
    const isLoggedIn = computed(() => {
        return store.getters[vuexTypes.isLoggedIn]
    });

    const changeStateBurger = () => {
        isActive.value = !isActive.value

        const body = document.body
        body.classList.toggle('lock')
    }

    return {
        isActive,
        activeClass,
        changeStateBurger,
        isLoggedIn
    }
}

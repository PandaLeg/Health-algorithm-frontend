import {computed, ref} from "vue";
import {useStore} from "vuex";
import {vuexTypes} from "../../store/vuex-types";

export default function () {
    const isActive = ref(false)
    const activeClass = computed(() => ({
        active: isActive.value
    }))

    const store = useStore()
    const user = store.getters[vuexTypes.user]

    const isLoggedIn = computed(() => {
        return store.getters[vuexTypes.isLoggedIn]
    });

    const isPatient = computed(() => {
        return user.roles.includes('PATIENT')
    })

    const changeStateBurger = () => {
        isActive.value = !isActive.value

        const body = document.body
        body.classList.toggle('lock')
    }

    return {
        isActive,
        activeClass,
        isPatient,
        isLoggedIn,
        changeStateBurger
    }
}

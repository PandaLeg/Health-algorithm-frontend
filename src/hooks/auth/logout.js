import {useStore} from "vuex";
import {vuexTypes} from "../../store/vuexTypes";
import routesNames from "../../router/routesNames";
import {useRouter} from "vue-router";

export default function (isActive = null, changeStateBurger = () => {}) {
    const store = useStore()
    const router = useRouter()

    const logoutUser = async () => {
        try {
            await store.dispatch(vuexTypes.LOGOUT)
        } finally {
            if (isActive?.value) {
                changeStateBurger()
            }
            router.push({name: routesNames.login.name})
        }
    }

    return {
        logoutUser
    }
}

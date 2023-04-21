import {useStore} from "vuex";
import {vuexTypes} from "../../store/vuexTypes";
import router from "../../router";
import routesNames from "../../router/routesNames";

export default function (isActive, changeStateBurger) {
    const store = useStore()

    const logoutUser = async () => {
        try {
            await store.dispatch(vuexTypes.LOGOUT)
        } catch (err) {
            console.log(err)
        } finally {
            if (isActive.value) {
                changeStateBurger()
            }
            router.push({name: routesNames.login.name})
        }
    }

    return {
        logoutUser
    }
}

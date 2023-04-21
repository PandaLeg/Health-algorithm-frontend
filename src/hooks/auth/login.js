import {useStore} from "vuex";
import {vuexTypes} from "../../store/vuexTypes";
import router from "../../router";
import routesNames from "../../router/routesNames";

export default function (v$, user) {
    const store = useStore()

    const isValid = () => {
        return !v$.value.phone.$error && !v$.value.password.$error
    }

    const loginUser = async () => {
        v$.value.$touch()

        if (!v$.value.$invalid && isValid()) {
            try {
                await store.dispatch(vuexTypes.LOGIN, user)

                router.push({name: routesNames.home.name})
            } catch (err) {
                console.log(err)
            }
        }
    }

    return {
        loginUser
    }
}

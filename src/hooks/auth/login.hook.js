import {useStore} from "vuex";
import {vuexTypes} from "../../store/vuex-types";
import routesNames from "../../router/routes-names";
import {useRouter} from "vue-router";

export default function (v$, user) {
    const store = useStore()
    const router = useRouter()

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
                store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data.message)
            }
        }
    }

    return {
        loginUser
    }
}

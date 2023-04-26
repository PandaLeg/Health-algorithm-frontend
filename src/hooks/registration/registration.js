import {useStore} from "vuex";
import {vuexTypes} from "../../store/vuexTypes";
import routesNames from "../../router/routesNames";
import {useRouter} from "vue-router";

export default function (v$, user, isValid, type) {
    const store = useStore()
    const router = useRouter()

    const registrationUser = async () => {
        v$.value.$touch()

        if (!v$.value.$invalid && isValid()) {
            try {
                await store.dispatch(vuexTypes.REGISTER_USER, {...user, type})

                router.push(routesNames.home.name)
            } catch (err) {
                store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data.message)
            }
        }
    }

    return {
        registrationUser
    }
}

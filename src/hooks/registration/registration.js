import {useStore} from "vuex";
import {vuexTypes} from "../../store/vuexTypes";
import router from "../../router";
import routesNames from "../../router/routesNames";

export default function (v$, user, isValid, type) {
    const store = useStore()

    const registrationUser = async () => {
        v$.value.$touch()

        if (!v$.value.$invalid && isValid()) {
            try {
                await store.dispatch(vuexTypes.REGISTER_USER, {...user, type})

                router.push(routesNames.home.name)
            } catch (err) {
                console.log(err)
            }
        }
    }

    return {
        registrationUser
    }
}

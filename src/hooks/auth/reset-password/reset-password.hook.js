import {useStore} from "vuex";
import {vuexTypes} from "../../../store/vuex-types";
import {useRoute} from "vue-router";

export default function (v$, password, confirmPassword, isSuccessfullySent) {
    const store = useStore()
    const route = useRoute()

    const isValid = () => {
        return !v$.value.password.$error && !v$.value.confirmPassword.$error
    }

    const resetPassword = async () => {
        v$.value.$touch()

        if (!v$.value.$invalid && isValid()) {
            try {
                const data = {
                    id: route.params.id,
                    code: route.query.code,
                    password: password.value,
                    confirmPassword: confirmPassword.value
                }
                await store.dispatch(vuexTypes.RESET_PASSWORD, data)

                isSuccessfullySent.value = true
            } catch (err) {
                store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data.message)
                isSuccessfullySent.value = false
            }
        }
    }

    return {
        resetPassword
    }
}

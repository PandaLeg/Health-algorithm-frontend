import {useStore} from "vuex";
import {vuexTypes} from "../../../store/vuexTypes";

export default function (v$, email) {
    const store = useStore()

    const isValid = () => {
        return !v$.value.email.$error
    }

    const sendResetCode = async () => {
        v$.value.$touch()

        if (!v$.value.$invalid && isValid()) {
            try {
                await store.dispatch(vuexTypes.SEND_RESET_CODE, email.value)
            } catch (err) {
                store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data.message)
            }
        }
    }

    return {
        sendResetCode
    }
}

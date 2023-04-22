import {useStore} from "vuex";
import {vuexTypes} from "../../../store/vuexTypes";

export default function (email) {
    const store = useStore()

    const sendConfirmation = async () => {
        try {
            await store.dispatch(vuexTypes.SEND_CONFIRMATION, email.value)
        } catch (err) {
            console.log(err)
        }
    }

    return {
        sendConfirmation
    }
}

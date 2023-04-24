import {useStore} from "vuex";
import {vuexTypes} from "../../../store/vuexTypes";

export default function (email) {
    const store = useStore()

    const sendConfirmation = async () => {
        try {
            await store.dispatch(vuexTypes.SEND_CONFIRMATION, email.value)

            store.commit(vuexTypes.UPDATE_NOTIFICATION, 'Email sent successfully')
        } catch (err) {
            store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data.message)
            console.log(err)
        }
    }

    return {
        sendConfirmation
    }
}

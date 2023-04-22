import {useRoute} from "vue-router";
import {onMounted} from "vue";

export default function (activationTokenError, email) {
    const route = useRoute()

    const isFailure = () => {
        return !!route.query.email
    }

    onMounted(() => {
        if (isFailure()) {
            email.value = route.query.email
            activationTokenError.value = true
        } else {
            activationTokenError.value = false
        }
    })
}

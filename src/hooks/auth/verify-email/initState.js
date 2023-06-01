import {ref} from "vue";

export default function () {
    const activationTokenError = ref(false)
    const email = ref('')

    return {
        activationTokenError,
        email
    }
}

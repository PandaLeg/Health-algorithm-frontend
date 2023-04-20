import {reactive} from "vue";

export default function () {
    const userCredentials = reactive({
        phone: '',
        password: ''
    })

    return {
        userCredentials
    }
}

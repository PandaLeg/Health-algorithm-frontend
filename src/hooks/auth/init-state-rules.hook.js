import {reactive} from "vue";
import {maxLength, minLength, required} from "@vuelidate/validators";

export default function () {
    const userCredentials = reactive({
        phone: '',
        password: ''
    })

    const rule = {
        phone: {
            required
        },
        password: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(20)
        }
    }

    return {
        userCredentials,
        rule
    }
}

import {reactive} from "vue";
import {email, maxLength, minLength, required} from "@vuelidate/validators";

export default function (entity, rule) {
    const user = reactive({
        phone: '',
        email: '',
        password: '',
        city: '',
        ...entity
    })

    const rules = {
        phone: {
            required,
        },
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(20)
        },
        city: {
            required,
        },
        ...rule
    }

    return {
        user,
        rules
    }
}

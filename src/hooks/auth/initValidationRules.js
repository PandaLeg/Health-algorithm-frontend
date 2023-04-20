import {maxLength, minLength, required} from "@vuelidate/validators";

export default function () {
    const rules = {
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
        rules
    }
}

import {reactive, ref} from "vue";
import {email, helpers, maxLength, minLength, required} from "@vuelidate/validators";

export default function (entity, rule) {
    const user = reactive({
        phone: '',
        email: '',
        password: '',
        ...entity
    })
    const image = ref(null)

    const rules = {
        phone: {
            required: helpers.withMessage('Enter phone', required),
        },
        email: {
            required: helpers.withMessage('Enter email', required),
            email: helpers.withMessage('Please provide a valid email address', email)
        },
        password: {
            required: helpers.withMessage('Enter password', required),
            minLength: helpers.withMessage('Min length 6', minLength(6)),
            maxLength: helpers.withMessage('Max length 20', maxLength(20))
        },
        ...rule
    }

    return {
        user,
        image,
        rules
    }
}

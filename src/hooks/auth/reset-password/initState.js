import {computed, ref} from "vue";
import {maxLength, minLength, required, sameAs} from "@vuelidate/validators";

export default function () {
    const password = ref('')
    const confirmPassword = ref('')
    const isSuccessfullySent = ref(false)

    const rules = computed(() => ({
        password: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(20)
        },
        confirmPassword: {
            sameAs: sameAs(password)
        }
    }))

    const defaultBody = {
        icon: '_icon-key',
        title: 'Set new password',
        subtitle: 'Your new password must be different to previously used passwords.'
    }

    const successfullyBody = {
        icon: '_icon-done',
        title: 'Password reset',
        subtitle: `Your password has been successfully reset. Click below to log in magically.`
    }

    const body = computed(() => {
        return isSuccessfullySent.value ? successfullyBody : defaultBody
    })

    return {
        password,
        confirmPassword,
        isSuccessfullySent,
        body,
        rules
    }
}

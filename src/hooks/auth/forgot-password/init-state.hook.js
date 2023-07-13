import {computed, reactive, ref} from "vue";
import {required, email as emailRule} from "@vuelidate/validators";

export default function () {
    const email = ref('')
    const isSuccessfullySent = ref(false)
    const rule = computed(() => ({
        email: {
            required,
            email: emailRule
        }
    }))

    const successfullyBody = {
        icon: '_icon-mail',
        title: 'Check your email',
        subtitle: `We sent a password reset link to ${email.value}`
    }

    const defaultBody = {
        icon: '_icon-key',
        title: 'Forgot password?',
        subtitle: 'No worries, we\'ll send you reset instruction.'
    }

    const body = computed(() => {
        return isSuccessfullySent.value ? successfullyBody : defaultBody
    })

    return {
        email,
        isSuccessfullySent,
        rule,
        body
    }
}

import {computed, ref} from "vue";
import {required, email as emailRule} from "@vuelidate/validators";

export default function () {
    const email = ref('')
    const rule = computed(() => ({
        email: {
            required,
            email: emailRule
        }
    }))

    return {
        email,
        rule
    }
}

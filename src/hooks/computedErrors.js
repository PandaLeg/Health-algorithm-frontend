import {computed} from "vue";

export default function (v$, isObj = false) {
    const emailErrors = computed(() => {
        const errors = []

        const dirty = isObj ? v$.value.user.email.$dirty : v$.value.email.$dirty

        if (!dirty) return errors

        const requiredRule = isObj ? v$.value.user.email.required : v$.value.email.required
        const emailRule = isObj ? v$.value.user.email.email : v$.value.email.email

        requiredRule.$invalid && errors.push('Enter email')
        emailRule.$invalid && errors.push('Please provide a valid email address')

        return errors
    })

    const phoneErrors = computed(() => {
        const errors = []

        const dirty = isObj ? v$.value.user.phone.$dirty : v$.value.phone.$dirty

        if (!dirty) return errors

        const requiredRule = isObj ? v$.value.user.phone.required : v$.value.phone.required

        requiredRule.$invalid && errors.push('Enter phone')

        return errors
    })

    const cityErrors = computed(() => {
        const errors = []

        const dirty = isObj ? v$.value.user.city.$dirty : v$.value.city.$dirty

        if (!dirty) return errors

        const requiredRule = isObj ? v$.value.user.city.required : v$.value.city.required

        requiredRule.$invalid && errors.push('Enter city')

        return errors
    })

    const passwordErrors = computed(() => {
        const errors = []

        const dirty = isObj ? v$.value.user.password.$dirty : v$.value.password.$dirty

        if (!dirty) return errors

        const requiredRule = isObj ? v$.value.user.password.required : v$.value.password.required
        const minLengthRule = isObj ? v$.value.user.password.minLength : v$.value.password.minLength
        const maxLengthRule = isObj ? v$.value.user.password.maxLength : v$.value.password.maxLength

        requiredRule.$invalid && errors.push('Enter password')
        minLengthRule && minLengthRule.$invalid && errors.push('Min length 6')
        maxLengthRule && maxLengthRule.$invalid && errors.push('Max length 20')

        return errors
    })

    return {
        emailErrors,
        phoneErrors,
        passwordErrors,
        cityErrors
    }
}

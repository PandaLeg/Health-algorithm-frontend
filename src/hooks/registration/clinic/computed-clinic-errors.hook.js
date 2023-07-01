import {computed} from "vue";

export default function (v$, locationVuelidate, isObj = false) {
    const nameErrors = computed(() => {
        const errors = []

        const dirty = isObj ? v$.value.user.clinic.name.$dirty : v$.value.clinic.name.$dirty

        if (!dirty) return errors

        const requiredRule = isObj ? v$.value.user.clinic.name.required : v$.value.clinic.name.required

        requiredRule.$invalid && errors.push('Enter clinic name')

        return errors
    })

    const isValid = () => {
        return !v$.value.email.$error && !v$.value.password.$error
            && !v$.value.phone.$error && !v$.value.clinic.name.$error
    }

    const isValidLocation = () => {
        let isValidLocation = true

        for (let i = 0; i < locationVuelidate.value.length; i++) {
            const v = locationVuelidate.value[i]
            v.$touch()

            if (!isValidLocation) {
                continue
            }

            isValidLocation = !v.city.$error && !v.address.$error
        }

        return isValidLocation
    }

    return {
        nameErrors,
        isValid,
        isValidLocation
    }
}

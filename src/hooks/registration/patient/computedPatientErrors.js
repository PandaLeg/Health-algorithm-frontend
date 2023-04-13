import {computed} from "vue";

export default function (v$, isObj = false) {
    const firstNameErrors = computed(() => {
        const errors = []

        const dirty = isObj ? v$.value.user.patient.firstName.$dirty : v$.value.patient.firstName.$dirty

        if (!dirty) return errors

        const requiredRule = isObj ? v$.value.user.patient.firstName.required : v$.value.patient.firstName.required

        requiredRule.$invalid && errors.push('Enter first name')

        return errors
    })

    const lastNameErrors = computed(() => {
        const errors = []

        const dirty = isObj ? v$.value.user.patient.lastName.$dirty : v$.value.patient.lastName.$dirty

        if (!dirty) return errors

        const requiredRule = isObj ? v$.value.user.patient.lastName.required : v$.value.patient.lastName.required

        requiredRule.$invalid && errors.push('Enter last name')

        return errors
    })

    const isValid = () => {
        return !v$.value.email.$error && !v$.value.password.$error
            && !v$.value.phone.$error && !v$.value.city.$error
            && !v$.value.patient.firstName.$error && !v$.value.patient.lastName.$error
    }

    return {
        firstNameErrors,
        lastNameErrors,
        isValid
    }
}

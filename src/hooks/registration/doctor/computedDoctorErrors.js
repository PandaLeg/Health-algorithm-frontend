import {computed} from "vue";

export default function (v$, isObj = false) {
    const firstNameErrors = computed(() => {
        const errors = []

        const dirty = isObj ? v$.value.user.doctor.firstName.$dirty : v$.value.doctor.firstName.$dirty

        if (!dirty) return errors

        const requiredRule = isObj ? v$.value.user.doctor.firstName.required : v$.value.doctor.firstName.required

        requiredRule.$invalid && errors.push('Enter first name')

        return errors
    })

    const lastNameErrors = computed(() => {
        const errors = []

        const dirty = isObj ? v$.value.user.doctor.lastName.$dirty : v$.value.doctor.lastName.$dirty

        if (!dirty) return errors

        const requiredRule = isObj ? v$.value.user.doctor.lastName.required : v$.value.doctor.lastName.required

        requiredRule.$invalid && errors.push('Enter last name')

        return errors
    })

    const surnameErrors = computed(() => {
        const errors = []

        const dirty = isObj ? v$.value.user.doctor.surname.$dirty : v$.value.doctor.surname.$dirty

        if (!dirty) return errors

        const requiredRule = isObj ? v$.value.user.doctor.surname.required : v$.value.doctor.surname.required

        requiredRule.$invalid && errors.push('Enter surname')

        return errors
    })

    const experienceErrors = computed(() => {
        const errors = []

        const dirty = isObj ? v$.value.user.doctor.experience.$dirty : v$.value.doctor.experience.$dirty

        if (!dirty) return errors

        const requiredRule = isObj ? v$.value.user.doctor.experience.required : v$.value.doctor.experience.required

        requiredRule.$invalid && errors.push('Enter experience')

        return errors
    })

    const categoryIdErrors = computed(() => {
        const errors = []

        const dirty = isObj ? v$.value.user.doctor.categoryId.$dirty : v$.value.doctor.categoryId.$dirty

        if (!dirty) return errors

        const requiredRule = isObj ? v$.value.user.doctor.categoryId.required : v$.value.doctor.categoryId.required

        requiredRule.$invalid && errors.push('Select category')

        return errors
    })

    const isValid = () => {
        return !v$.value.email.$error && !v$.value.password.$error
            && !v$.value.phone.$error && !v$.value.city.$error
            && !v$.value.doctor.firstName.$error && !v$.value.doctor.lastName.$error
            && !v$.value.doctor.surname.$error && !v$.value.doctor.experience.$error
            && !v$.value.doctor.categoryId.$error
    }

    return {
        firstNameErrors,
        lastNameErrors,
        surnameErrors,
        experienceErrors,
        categoryIdErrors,
        isValid
    }
}

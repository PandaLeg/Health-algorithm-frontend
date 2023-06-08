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

    const specialtiesErrors = computed(() => {
        const errors = []

        const dirty = isObj ? v$.value.user.doctor.specialties.$dirty : v$.value.doctor.specialties.$dirty

        if (!dirty) return errors

        const requiredRule = isObj ? v$.value.user.doctor.specialties.required : v$.value.doctor.specialties.required

        requiredRule.$invalid && errors.push('Select specialties')

        return errors
    })

    const aboutErrors = computed(() => {
        const errors = []

        const dirty = isObj ? v$.value.user.doctor.description.about.$dirty : v$.value.doctor.description.about.$dirty

        if (!dirty) return errors

        const requiredRule = isObj ? v$.user.doctor.description.about.required : v$.value.doctor.description.about.required

        requiredRule.$invalid && errors.push('Write about yourself')

        return errors
    })

    const educationErrors = computed(() => {
        const errors = []

        const dirty = isObj ? v$.value.user.doctor.description.education.$dirty : v$.value.doctor.description.education.$dirty

        if (!dirty) return errors

        const requiredRule = isObj ? v$.user.doctor.description.education.required : v$.value.doctor.description.education.required

        requiredRule.$invalid && errors.push('Describe your education')

        return errors
    })

    const placesErrors = computed(() => {
        const errors = []

        const dirty = isObj ? v$.value.user.doctor.places.$dirty : v$.value.doctor.places.$dirty

        if (!dirty) return errors

        const requiredRule = isObj ? v$.user.doctor.places.required : v$.value.doctor.places.required

        requiredRule.$invalid && errors.push('Select clinic')

        return errors
    })

    const isValidGeneral = () => {
        return !v$.value.email.$error && !v$.value.password.$error
            && !v$.value.phone.$error && !v$.value.city.$error
            && !v$.value.doctor.firstName.$error && !v$.value.doctor.lastName.$error
            && !v$.value.doctor.surname.$error
    }

    const isValidSpecialty = () => {
        return !v$.value.doctor.experience.$error && !v$.value.doctor.categoryId.$error
            && !v$.value.doctor.specialties.$error && !v$.value.doctor.description.about.$error
            && !v$.value.doctor.description.education.$error
    }

    const isValidPlace = () => {
        return !v$.value.doctor.places.$error
    }

    const isValid = () => {
        return isValidGeneral() && isValidSpecialty() && isValidPlace()
    }

    return {
        firstNameErrors,
        lastNameErrors,
        surnameErrors,
        experienceErrors,
        categoryIdErrors,
        specialtiesErrors,
        aboutErrors,
        educationErrors,
        placesErrors,
        isValidGeneral,
        isValidSpecialty,
        isValid
    }
}

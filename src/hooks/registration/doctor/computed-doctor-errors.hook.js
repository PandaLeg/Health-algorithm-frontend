import {computed} from "vue";

export default function (v$, locationVuelidate, isObj = false) {
    const isValidGeneral = () => {
        return !v$.value.email.$error && !v$.value.password.$error && !v$.value.phone.$error
            && !v$.value.doctor.firstName.$error && !v$.value.doctor.lastName.$error
            && !v$.value.doctor.surname.$error
    }

    const isValidSpecialty = () => {
        return !v$.value.doctor.experience.$error && !v$.value.doctor.categoryId.$error
            && !v$.value.doctor.specialties.$error && !v$.value.doctor.description.about.$error
            && !v$.value.doctor.description.education.$error
    }

    const isValid = () => {
        return isValidGeneral() && isValidSpecialty()
    }

    const isValidLocation = () => {
        let isValidLocation = true

        for (let i = 0; i < locationVuelidate.value.length; i++) {
            const v = locationVuelidate.value[i]
            v.$touch()

            if (!isValidLocation) {
                continue
            }

            isValidLocation = !v.city.$error && !v.name.$error && !v.address.$error
        }

        return isValidLocation
    }

    return {
        isValidGeneral,
        isValidSpecialty,
        isValid,
        isValidLocation
    }
}

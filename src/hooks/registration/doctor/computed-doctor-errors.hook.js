export default function (v$, vPlace, locationVuelidate) {
    const isValidGeneral = () => {
        return !v$.value.email.$error && !v$.value.password.$error && !v$.value.phone.$error
            && !v$.value.doctor.firstName.$error && !v$.value.doctor.lastName.$error
            && !v$.value.doctor.surname.$error && !v$.value.doctor.price.$error
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
        vPlace.value.$touch()

        for (let i = 0; i < locationVuelidate.value.length; i++) {
            const v = locationVuelidate.value[i]
            v.$touch()

            if (!isValidLocation) {
                continue
            }

            isValidLocation = !v.weekDay.$error && !v.duration.$error && !v.from.$error && !v.to.$error
        }
        return isValidLocation && !vPlace.value.city.$error && !vPlace.value.clinicName.$error && !vPlace.value.address.$error
    }

    return {
        isValidGeneral,
        isValidSpecialty,
        isValid,
        isValidLocation
    }
}

export default function (v$, locationVuelidate) {
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
            const currentLocation = locationVuelidate.value[i]

            for (let j = 0; j < currentLocation.value.length; j++) {
                const v = currentLocation.value[j]
                v.$touch()

                if (!isValidLocation) {
                    continue
                }

                isValidLocation = v.city ? !v.city.$error && !v.clinicName.$error && !v.address.$error :
                    !v.weekDay.$error && !v.duration.$error && !v.from.$error && !v.to.$error
            }
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

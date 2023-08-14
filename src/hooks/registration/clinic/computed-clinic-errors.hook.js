export default function (v$, locationVuelidate) {
    const isValid = () => {
        return !v$.value.email.$error && !v$.value.password.$error && !v$.value.phone.$error
            && !v$.value.clinic.name.$error && !v$.value.clinic.description.$error && !v$.value.clinic.clinicType.$error
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

                isValidLocation = v.city ? !v.city.$error && !v.address.$error && !v.conveniences.$error :
                    !v.weekDays.$error && !v.dayType.$error && (v.dayType.$model === 'Workday' ?
                        !v.from.$error && !v.to.$error : true)
            }
        }

        return isValidLocation
    }

    return {
        isValid,
        isValidLocation
    }
}

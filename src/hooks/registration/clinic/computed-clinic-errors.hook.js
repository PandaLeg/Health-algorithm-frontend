export default function (v$, locationVuelidate, isObj = false) {
    const isValid = () => {
        return !v$.value.email.$error && !v$.value.password.$error
            && !v$.value.phone.$error && !v$.value.clinic.name.$error
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

                isValidLocation = v.city ? !v.city.$error && !v.address.$error : !v.weekDays.$error && !v.dayType.$error
            }
        }

        return isValidLocation
    }

    return {
        isValid,
        isValidLocation
    }
}

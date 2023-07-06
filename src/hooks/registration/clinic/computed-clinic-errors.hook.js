import {computed} from "vue";

export default function (v$, locationVuelidate, isObj = false) {
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
        isValid,
        isValidLocation
    }
}

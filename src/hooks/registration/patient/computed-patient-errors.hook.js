export default function (v$) {
    const isValid = () => {
        return !v$.value.email.$error && !v$.value.password.$error
            && !v$.value.phone.$error && !v$.value.patient.firstName.$error
            && !v$.value.patient.lastName.$error && !v$.value.patient.city.$error
    }

    return {
        isValid
    }
}

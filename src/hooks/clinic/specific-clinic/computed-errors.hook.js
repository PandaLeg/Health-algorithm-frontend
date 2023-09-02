export default function (v$) {
    const isValid = () => {
        return !v$.value.doctorId.$error && !v$.value.dateAppointment.$error && !v$.value.time.$error
    }

    return {
        isValid
    }
}

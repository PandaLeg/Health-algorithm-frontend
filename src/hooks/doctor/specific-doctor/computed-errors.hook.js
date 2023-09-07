export default function (v$) {
    const isValid = () => {
        return !v$.value.clinicBranchId.$error && !v$.value.dateAppointment.$error && !v$.value.time.$error
    }

    return {
        isValid
    }
}

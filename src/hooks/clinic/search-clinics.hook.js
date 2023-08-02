export default function (v$, clinicInfo, getClinic, getClinics) {
    const search = async () => {
        v$.value.$touch()

        if (!v$.value.$invalid && !v$.value.city.$error) {
            if (clinicInfo.city && clinicInfo.clinic) {
                await getClinic()
            } else if (clinicInfo.city) {
                await getClinics()
            }
        }
    }

    return {
        search
    }
}

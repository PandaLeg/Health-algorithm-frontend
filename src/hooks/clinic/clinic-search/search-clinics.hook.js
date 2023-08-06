export default function (v$, clinicInfo, getClinic, getClinics) {
    const search = async () => {
        v$.value.$touch()

        if (!v$.value.$invalid && !v$.value.city.$error) {
            clinicInfo.city && clinicInfo.clinic ? await getClinic() : await getClinics()
        }
    }

    return {
        search
    }
}

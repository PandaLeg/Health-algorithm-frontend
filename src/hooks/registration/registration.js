export default function (v$, user, isValid, type) {
    const registrationUser = async () => {
        v$.value.$touch()

        if (!v$.value.$invalid && isValid()) {
            try {

            } catch (err) {
                console.log(err)
            }
        }
    }

    return {
        registrationUser
    }
}

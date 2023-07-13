export default function (v$, step, isValidGeneral, isValidSpecialty) {

    const nextStep = () => {
        v$.value.$touch()

        if (step.isGeneralActive && isValidGeneral()) {
            v$.value.$reset()

            step.isSpecialtyActive = true
            step.isGeneralSuccess = true
            step.isGeneralActive = !step.isGeneralActive
        } else if (step.isSpecialtyActive && isValidSpecialty()) {
            v$.value.$reset()

            step.isPlaceActive = true
            step.isSpecialtySuccess = true
            step.isSpecialtyActive = !step.isSpecialtyActive
        }
    }

    return {
        nextStep
    }
}

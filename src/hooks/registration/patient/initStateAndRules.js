import {required} from "@vuelidate/validators";

export default function () {
    const entity = {
        patient: {
            firstName: '',
            lastName: '',
        }
    }
    const rule = {
        patient: {
            firstName: {
                required,
            },
            lastName: {
                required,
            },
        }
    }

    return {
        entity,
        rule
    }
}

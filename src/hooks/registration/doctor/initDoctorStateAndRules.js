import {required} from "@vuelidate/validators";

export default function () {
    const entity = {
        doctor: {
            firstName: '',
            lastName: '',
            surname: '',
            experience: null,
            categoryId: '',
            specialties: []
        }
    }
    const rule = {
        doctor: {
            firstName: {
                required
            },
            lastName: {
                required
            },
            surname: {
                required
            },
            experience: {
                required
            },
            categoryId: {
                required
            },
            specialties: {
                required
            }
        }
    }

    return {
        entity,
        rule
    }
}

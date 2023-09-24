import {helpers, required} from "@vuelidate/validators";
import {ref} from "vue";

export default function () {
    const entity = {
        patient: {
            firstName: '',
            lastName: '',
            city: null,
        }
    }

    const searchCity = ref('')
    const searchedCities = ref([])

    const rule = {
        patient: {
            firstName: {
                required: helpers.withMessage('Enter first name', required),
            },
            lastName: {
                required: helpers.withMessage('Enter last name', required),
            },
            city: {
                required: helpers.withMessage('Enter city', required),
            },
        }
    }

    return {
        entity,
        searchCity,
        searchedCities,
        rule
    }
}

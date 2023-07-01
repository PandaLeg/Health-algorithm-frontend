import {helpers, required} from "@vuelidate/validators";
import {ref} from "vue";

export default function () {
    const locations = ref([
        {id: 1, city: null, searchCity: '', cities: [], address: null},
    ])
    const locationVuelidate = ref([])

    const entity = {
        clinic: {
            name: ''
        }
    }

    const rule = {
        clinic: {
            name: { required }
        }
    }

    const locationRule = {
        city: {
            required: helpers.withMessage('Enter city', required)
        },
        address: {
            required: helpers.withMessage('Enter address', required)
        }
    }

    return {
        locations,
        entity,
        rule,
        locationRule,
        locationVuelidate
    }
}

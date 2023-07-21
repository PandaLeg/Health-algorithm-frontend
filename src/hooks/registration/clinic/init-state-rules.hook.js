import {helpers, required} from "@vuelidate/validators";
import {ref} from "vue";
import dayInformation from '../../../util/dayInformation.json'

export default function () {
    const locations = ref([
        {
            id: 1, city: null, searchCity: '', cities: [], address: null, workingHours: [
                {
                    id: 1,
                    weekDay: null,
                    days: dayInformation.days,
                    dayType: null,
                    types: dayInformation.dayTypes,
                    from: null,
                    to: null
                }
            ]
        },
    ])
    const locationVuelidate = ref([])
    const scheduleVuelidate = ref([])

    const entity = {
        clinic: {
            name: ''
        }
    }

    const rule = {
        clinic: {
            name: {
                required: helpers.withMessage('Enter clinic name', required)
            }
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

    const workingHourRule = {
        weekDay: {
            required: helpers.withMessage('Select day', required)
        },
        dayType: {
            required: helpers.withMessage('Select type of day', required)
        },
        from: {
            required: helpers.withMessage('Select from time', required)
        },
        to: {
            required: helpers.withMessage('Select to time', required)
        }
    }

    return {
        locations,
        entity,
        rule,
        locationRule,
        locationVuelidate,
        workingHourRule,
        scheduleVuelidate
    }
}

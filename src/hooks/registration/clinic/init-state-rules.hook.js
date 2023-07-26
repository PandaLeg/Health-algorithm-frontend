import {helpers, required} from "@vuelidate/validators";
import {ref} from "vue";
import dayInformation from '../../../util/dayInformation.json'
import {getConveniences, getWeekDays, getClinicTypes} from "./clinic-information.hook";

export default function () {
    const weekDays = ref([])
    const conveniencesFromDb = ref([])
    const clinicTypes = ref([])

    const locations = ref([
        {
            id: 1, city: null, searchCity: '', cities: [], address: null, schedule: [
                {
                    id: 1,
                    weekDays: [],
                    days: weekDays,
                    dayType: null,
                    types: dayInformation.dayTypes,
                    from: null,
                    to: null
                }
            ]
        },
    ])
    const locationVuelidate = ref([])

    getWeekDays(weekDays)
    getConveniences(conveniencesFromDb)
    getClinicTypes(clinicTypes)

    const entity = {
        clinic: {
            name: '',
            description: '',
            clinicType: null,
            conveniences: []
        }
    }

    const rule = {
        clinic: {
            name: {
                required: helpers.withMessage('Enter clinic name', required)
            },
            description: {
                required: helpers.withMessage('Describe your clinic', required)
            },
            clinicType: {
                required: helpers.withMessage('Select type of clinic', required)
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

    const checkRequiredValue = (value, siblingState) => {
        if (typeof value === 'string') {
            value = value.trim();
        }

        return siblingState.dayType === 'Workday' ? value !== undefined && value !== null && !!String(value).length : true
    }

    const scheduleRule = {
        weekDays: {
            required: helpers.withMessage('Select day', required)
        },
        dayType: {
            required: helpers.withMessage('Select type of day', required)
        },
        from: {
            required: {
                $validator: checkRequiredValue,
                $message: 'Select from time',
                $params: {
                    type: 'required'
                }
            }
        },
        to: {
            required: {
                $validator: checkRequiredValue,
                $message: 'Select to time',
                $params: {
                    type: 'required'
                }
            }
        }
    }

    return {
        locations,
        weekDays,
        clinicTypes,
        conveniencesFromDb,
        entity,
        rule,
        locationRule,
        locationVuelidate,
        scheduleRule,
    }
}

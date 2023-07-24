import {helpers, required} from "@vuelidate/validators";
import {ref} from "vue";
import dayInformation from '../../../util/dayInformation.json'
import getWeekDaysHook from "./get-week-days.hook";

export default function () {
    const weekDays = ref([])
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

    getWeekDaysHook(weekDays)

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
        entity,
        rule,
        locationRule,
        locationVuelidate,
        scheduleRule,
    }
}

import {helpers, required} from "@vuelidate/validators";
import {reactive, ref} from "vue";
import dayInformation from '../../../util/dayInformation.json'
import {getConveniences, getWeekDays, getClinicTypes} from "./clinic-information.hook";
import {checkRequiredValue} from "../custom-validators.hook";

export default function () {
    const weekDays = ref([])
    const conveniencesFromDb = ref([])
    const clinicTypes = ref([])

    const locations = reactive([
        {
            id: 1,
            city: null,
            searchCity: '',
            searchedCities: [],
            address: '',
            conveniences: [],
            convenienceItems: conveniencesFromDb,
            days: weekDays,
            schedule: [
                {
                    id: 1,
                    weekDays: [],
                    dayType: '',
                    types: dayInformation.dayTypes,
                    from: '',
                    to: ''
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
            clinicType: null
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
        },
        conveniences: {
            required: helpers.withMessage('Select convenience', required)
        }
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

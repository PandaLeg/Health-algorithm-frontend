import {reactive, ref} from "vue";
import getAllCategoriesSpecialties from "./get-categories-specialties.hook";
import {helpers, maxValue, minValue, required} from "@vuelidate/validators";
import {checkRequiredValue, correctTime} from "../custom-validators.hook";

export default function () {
    const specialtiesFromDb = ref([])
    const categories = ref([])
    const step = reactive({
        isGeneralActive: true,
        isGeneralSuccess: false,
        isSpecialtyActive: false,
        isSpecialtySuccess: false,
        isPlaceActive: false,
    })

    const workPlace = reactive({
            id: 1,
            city: null,
            clinicName: null,
            address: null,
            searchCity: '',
            searchClinic: '',
            searchedCities: [],
            searchedClinics: [],
            clinicBranches: [],
            addresses: [],
            days: [],
            schedule: [
                {
                    id: 1,
                    weekDay: null,
                    duration: '',
                    from: '',
                    to: ''
                }
            ]
        },
    )

    const workPlaceVuelidate = ref([])

    const entity = {
        doctor: {
            firstName: '',
            lastName: '',
            surname: '',
            dateOfBirth: null,
            price: '',
            experience: '',
            categoryId: '',
            specialties: [],
            description: {
                about: '',
                education: '',
                course: ''
            }
        }
    }

    getAllCategoriesSpecialties(specialtiesFromDb, categories)

    const rule = {
        doctor: {
            firstName: {
                required: helpers.withMessage('Enter first name', required)
            },
            lastName: {
                required: helpers.withMessage('Enter last name', required)
            },
            surname: {
                required: helpers.withMessage('Enter surname', required)
            },
            price: {
                required: helpers.withMessage('Enter price', required),
                minValue: helpers.withMessage('Min price is 10', minValue(10))
            },
            experience: {
                required: helpers.withMessage('Enter experience', required),
                minValue: helpers.withMessage('Min experience is 1', minValue(1)),
                maxValue: helpers.withMessage('Min experience is 1', maxValue(60))
            },
            categoryId: {
                required: helpers.withMessage('Select category', required)
            },
            specialties: {
                required: helpers.withMessage('Select specialties', required)
            },
            description: {
                about: {
                    required: helpers.withMessage('Write about yourself', required)
                },
                education: {
                    required: helpers.withMessage('Describe your education', required)
                }
            }
        }
    }

    const workPlaceRule = {
        city: {
            required: helpers.withMessage('Enter city', required)
        },
        clinicName: {
            required: helpers.withMessage('Enter name', required)
        },
        address: {
            required: helpers.withMessage('Enter address', required)
        }
    }


    const scheduleRule = reactive({
        weekDay: {
            required: helpers.withMessage('Select day', required)
        },
        duration: {
            required: helpers.withMessage('Specify the duration of the appointment', required),
            correctFormat: {
                $validator: correctTime,
                $message: 'Invalid format',
                $params: {
                    type: 'correctFormat'
                }
            }
        },
        from: {
            required: {
                $validator: checkRequiredValue,
                $message: 'Select from time',
                $params: {
                    type: 'required'
                }
            },
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
    })

    return {
        entity,
        specialtiesFromDb,
        categories,
        rule,
        workPlaceRule,
        step,
        workPlace,
        workPlaceVuelidate,
        scheduleRule,
    }
}

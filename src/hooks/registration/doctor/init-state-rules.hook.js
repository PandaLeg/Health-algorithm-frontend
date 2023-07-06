import {reactive, ref} from "vue";
import getAllCategoriesSpecialties from "./get-categories-specialties.hook";
import {helpers, required} from "@vuelidate/validators";

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
    const workPlaces = ref([
        {
            id: 1,
            city: null,
            name: null,
            address: null,
            searchCity: '',
            searchClinic: '',
            cities: [],
            clinics: [],
            addresses: []
        },
    ])

    const workPlaceVuelidate = ref([])

    const entity = {
        doctor: {
            firstName: '',
            lastName: '',
            surname: '',
            dateOfBirth: null,
            experience: null,
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
            experience: {
                required: helpers.withMessage('Enter experience', required)
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
        name: {
            required: helpers.withMessage('Enter name', required)
        },
        address: {
            required: helpers.withMessage('Enter address', required)
        }
    }

    return {
        entity,
        specialtiesFromDb,
        categories,
        rule,
        workPlaceRule,
        step,
        workPlaces,
        workPlaceVuelidate
    }
}

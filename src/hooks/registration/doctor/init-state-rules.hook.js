import {reactive, ref} from "vue";
import getAllCategoriesSpecialties from "./getAllCategoriesSpecialties";
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
            },
            description: {
                about: {
                    required
                },
                education: {
                    required
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

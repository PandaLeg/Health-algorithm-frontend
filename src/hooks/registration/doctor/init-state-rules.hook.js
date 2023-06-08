import {reactive, ref} from "vue";
import getAllCategoriesSpecialties from "./getAllCategoriesSpecialties";
import {required} from "@vuelidate/validators";

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
    const contentFields = ref([
        {id: 1, city: null, searchCity: '', searchClinic: '', cities: [], clinics: []},
    ])
    const citiesFromDb = ref([])
    const clinicsFromDb = ref([])

    const entity = {
        doctor: {
            firstName: '',
            lastName: '',
            surname: '',
            experience: null,
            categoryId: '',
            specialties: [],
            description: {
                about: '',
                education: '',
                course: ''
            },
            places: []
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
            },
            places: {
                required
            }
        }
    }

    return {
        entity,
        specialtiesFromDb,
        categories,
        rule,
        step,
        contentFields,
        citiesFromDb,
        clinicsFromDb,
    }
}

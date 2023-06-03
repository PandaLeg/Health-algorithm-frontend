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
    })

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

    return {
        entity,
        specialtiesFromDb,
        categories,
        rule,
        step
    }
}

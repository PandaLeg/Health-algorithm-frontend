import {ref} from "vue";
import getAllCategoriesSpecialties from "./getAllCategoriesSpecialties";
import {required} from "@vuelidate/validators";

export default function () {
    const specialtiesFromDb = ref([])
    const categories = ref([])

    const entity = {
        doctor: {
            firstName: '',
            lastName: '',
            surname: '',
            experience: null,
            categoryId: '',
            specialties: []
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
            }
        }
    }

    return {
        entity,
        specialtiesFromDb,
        categories,
        rule
    }
}

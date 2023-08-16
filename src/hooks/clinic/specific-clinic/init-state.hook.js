import {computed, ref} from "vue";
import getFullInfoClinicHook from "./get-full-info-clinic.hook";

export default function () {
    const clinic = ref({})
    const clinics = ref([])
    const page = ref(1)
    const perPage = ref(5)
    const totalPages = ref(0)

    const hasClinicInfo = computed(() => {
        return Object.keys(clinic.value).length
    })

    getFullInfoClinicHook(clinic)

    return {
        clinic,
        clinics,
        page,
        perPage,
        totalPages,
        hasClinicInfo
    }
}

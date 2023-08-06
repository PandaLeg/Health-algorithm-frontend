import {computed, reactive} from "vue";
import getFullInfoClinicHook from "./get-full-info-clinic.hook";

export default function () {
    const clinic = reactive({})
    const hasClinicInfo = computed(() => {
        return Object.keys(clinic).length
    })

    getFullInfoClinicHook(clinic)

    return {
        clinic,
        hasClinicInfo
    }
}

import {computed, reactive, ref} from "vue";
import {helpers, required} from "@vuelidate/validators";

export default function () {
    const clinics = ref([])
    const page = ref(1)
    const perPage = ref(5)
    const totalPages = ref(0)
    const clinicInfo = reactive({
        searchCity: '',
        city: '',
        cities: [],
        searchClinic: '',
        clinic: '',
        clinics: []
    })
    const isClinicDisabled = computed(() => {
        return !(!!clinicInfo.city)
    })

    const cityRule = {
        city: {
            required: helpers.withMessage('Select city', required)
        }
    }

    return {
        clinics,
        page,
        perPage,
        totalPages,
        clinicInfo,
        isClinicDisabled,
        cityRule
    }
}
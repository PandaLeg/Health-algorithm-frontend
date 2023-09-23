import {computed, reactive, ref} from "vue";
import getSpecialtiesHook from "./get-specialties.hook";

export default function () {
    const currentPage = ref(1)
    const perPage = ref(1)
    const totalPages = ref(1)
    const doctors = ref([])
    const isLoading = ref(false)
    const staticDoctorInfo = reactive({
        avatar: '',
        categoryName: '',
        experience: 0,
        firstName: '',
        lastName: '',
        surname: '',
        specialties: [],
        userId: 1
    })
    const countDoctors = ref(0)
    const currentCity = ref('Kyiv')

    const searchDoctorInfo = reactive({
        searchCity: '',
        searchDoctorName: '',
        city: null,
        specialty: null,
        doctorName: null
    })
    const searchedCities = ref([])
    const specialties = ref([])
    const names = ref([])

    const isDoctorFieldsDisabled = computed(() => {
        return !(!!searchDoctorInfo.city)
    })

    getSpecialtiesHook(specialties)

    return {
        currentPage,
        perPage,
        totalPages,
        doctors,
        isLoading,
        staticDoctorInfo,
        countDoctors,
        currentCity,
        searchDoctorInfo,
        searchedCities,
        specialties,
        names,
        isDoctorFieldsDisabled
    }
}

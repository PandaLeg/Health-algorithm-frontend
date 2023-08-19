import {computed, reactive, ref} from "vue";
import {helpers, required} from "@vuelidate/validators";
import getSpecialtiesHook from "./get-specialties.hook";

export default function () {
    const currentPage = ref(1)
    const perPage = ref(5)
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
    const slotsDays = ref([
        {
            day: 'Sat',
            date: '19 May'
        },
        {
            day: 'Sun',
            date: '20 May'
        },
        {
            day: 'Mon',
            date: '21 May'
        }
    ])

    const visitTimes = ref([
        '10:00', '10:30', '11:00', '11:30', '12:00',
        '12:30', '13:00', '13:30'
    ])

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

    const cityRule = {
        city: {
            required: helpers.withMessage('Select city', required)
        }
    }

    getSpecialtiesHook(specialties)

    return {
        currentPage,
        perPage,
        totalPages,
        doctors,
        isLoading,
        staticDoctorInfo,
        slotsDays,
        visitTimes,
        searchDoctorInfo,
        searchedCities,
        specialties,
        names,
        isDoctorFieldsDisabled,
        cityRule
    }
}

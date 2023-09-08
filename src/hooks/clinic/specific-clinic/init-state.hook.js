import {computed, reactive, ref} from "vue";
import getFullInfoClinicHook from "./get-full-info-clinic.hook";
import {helpers, required} from "@vuelidate/validators";
import {useRoute} from "vue-router";

export default function () {
    const route = useRoute()

    const clinic = ref({})
    const clinics = ref([])
    const page = ref(1)
    const perPage = ref(5)
    const totalPages = ref(0)
    const doctors = ref([])
    const doctorPage = ref(1)
    const doctorPerPage = ref(5)
    const doctorTotalPages = ref(0)

    const doctorsForAppointments = ref([])
    const appointment = reactive({
        doctorId: null,
        clinicBranchId: route.query.branch,
        patientId: null,
        dateAppointment: null,
        time: null
    })
    const appointmentSchedule = ref([])
    const workingHours = ref([])
    const isActive = ref(false)

    const hasClinicInfo = computed(() => {
        return !!Object.keys(clinic.value).length
    })

    const appointmentRule = {
        doctorId: {
            required: helpers.withMessage('Select doctor', required)
        },
        dateAppointment: {
            required: helpers.withMessage('Select date', required)
        },
        time: {
            required: helpers.withMessage('Select appointment time', required)
        }
    }

    getFullInfoClinicHook(clinic)

    return {
        clinic,
        clinics,
        page,
        perPage,
        totalPages,
        hasClinicInfo,
        appointment,
        appointmentSchedule,
        workingHours,
        doctorsForAppointments,
        isActive,
        appointmentRule,
        doctors,
        doctorPage,
        doctorPerPage,
        doctorTotalPages
    }
}

import {computed, onMounted, reactive, ref} from "vue";
import getFullInfoClinicHook from "./get-full-info-clinic.hook";
import {helpers, required} from "@vuelidate/validators";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

export default function () {
    const route = useRoute()
    const store = useStore()

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
        clinicBranchId: route.params.id,
        patientId: null,
        dateAppointment: null,
        time: null
    })
    const appointmentSchedule = ref([])
    const workingHours = ref([])
    const isActive = ref(false)

    const resetState = (to) => {
        clinic.value = {}
        clinics.value = []
        page.value = 1
        perPage.value = 5
        totalPages.value = 0
        doctors.value = []
        doctorPage.value = 0
        doctorPerPage.value = 0
        doctorTotalPages.value = 0

        doctorsForAppointments.value = []
        appointmentSchedule.value = []
        workingHours.value = []
        isActive.value = false

        appointment.doctorId = null
        appointment.clinicBranchId = to.params.id
        appointment.patientId = null
        appointment.dateAppointment = null
        appointment.time = null
    }

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
    const {getFullInfoClinic} = getFullInfoClinicHook(clinic)

    onMounted(getFullInfoClinic.bind(null, store, route))

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
        doctorTotalPages,
        store,
        resetState
    }
}

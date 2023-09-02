import {reactive, ref} from "vue";
import getFullInfoDoctorHook from "./get-full-info-doctor.hook";
import {helpers, required} from "@vuelidate/validators";
import {useRoute} from "vue-router";

export default function () {
    const route = useRoute()
    const doctorId = route.params.id

    const doctor = ref({})
    const clinics = ref([])
    const appointment = reactive({
        doctorId,
        clinicBranchId: null,
        patientId: null,
        dateAppointment: null,
        time: null
    })
    const workingHours = ref([])
    const clinicBranches = ref([])
    const appointmentSchedule = ref([])
    const isActive = ref(false)

    getFullInfoDoctorHook(doctor, clinics, clinicBranches)

    const appointmentRule = {
        clinicBranchId: {
            required: helpers.withMessage('Select address clinic', required)
        },
        dateAppointment: {
            required: helpers.withMessage('Select date', required)
        },
        time: {
            required: helpers.withMessage('Select appointment time', required)
        }
    }

    return {
        doctor,
        clinics,
        appointment,
        appointmentRule,
        workingHours,
        appointmentSchedule,
        isActive,
        clinicBranches,
        doctorId
    }
}

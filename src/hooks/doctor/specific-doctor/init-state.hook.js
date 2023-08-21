import {ref} from "vue";
import getFullInfoDoctorHook from "./get-full-info-doctor.hook";

export default function () {
    const doctor = ref({})
    const clinics = ref([])

    getFullInfoDoctorHook(doctor, clinics)

    return {
        doctor,
        clinics
    }
}

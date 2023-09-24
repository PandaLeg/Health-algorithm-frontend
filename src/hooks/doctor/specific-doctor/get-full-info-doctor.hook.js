import {useStore} from "vuex";
import {config} from "../../../util/config";
import axios from "axios";
import {vuexTypes} from "../../../store/vuex-types";
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import buildSchedule from "../../clinic/specific-clinic/build-schedule";

export default function (doctor, clinics, clinicBranches) {
    const store = useStore()
    const route = useRoute()

    const getDoctorsWithWorkPlaces = async () => {
        try {
            const doctorId = route.params.id;
            const url = config.apiUrl + `/doctors/${doctorId}/clinics`

            const response = await axios.get(url)
            const data = response.data

            doctor.value = data.doctor;
            clinics.value = data.clinics.map(clinic => {
                clinicBranches.value.push(clinic.clinicBranchId)
                return {
                    clinicId: clinic.clinicId,
                    city: clinic.city,
                    clinicBranchId: clinic.clinicBranchId,
                    type: clinic.type,
                    address: clinic.address,
                    conveniences: clinic.conveniences,
                    schedule: buildSchedule(clinic.schedule)
                }
            })
        } catch (err) {
            store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
        }
    }

    onMounted(getDoctorsWithWorkPlaces)
}

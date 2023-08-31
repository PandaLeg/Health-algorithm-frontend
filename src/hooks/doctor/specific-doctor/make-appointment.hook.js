import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {vuexTypes} from "../../../store/vuexTypes";
import {config} from "../../../util/config";
import authAxios from "../../../http";

export default function (appointment, v$, isActive, isValid) {
    const store = useStore()
    const route = useRoute()

    const makeAppointment = async () => {
        v$.value.$touch()

        try {
            if (!v$.value.invalid && isValid()) {
                const doctorId = route.params.id;
                const url = config.apiUrl + `/appointments`

                const body = {
                    ...appointment,
                    doctorId,
                    patientId: 'fd3573b8-b3ac-4f85-afab-ee9e5854a0f3'
                }

                const response = await authAxios.post(url, body)

                isActive.value = false
                appointment.clinicBranchId = null
                appointment.dateAppointment = null
                appointment.time = null

                store.commit(vuexTypes.UPDATE_NOTIFICATION, response.data.message)

                v$.value.$reset()
            }
        } catch (err) {
            store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
        }
    }

    return {
        makeAppointment
    }
}

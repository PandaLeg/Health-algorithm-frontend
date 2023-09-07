import {useStore} from "vuex";
import {vuexTypes} from "../../../store/vuexTypes";
import {config} from "../../../util/config";
import authAxios from "../../../http";

export default function (appointment, v$, isActive, patientId, isValid, store) {

    const makeAppointment = async () => {
        v$.value.$touch()

        try {
            if (!v$.value.invalid && isValid()) {
                const url = config.apiUrl + `/appointments`

                const body = {
                    ...appointment,
                    patientId
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

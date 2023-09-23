import {config} from "../../../util/config";
import axios from "axios";
import {vuexTypes} from "../../../store/vuex-types";
import buildSchedule from "./build-schedule";

export default function (clinic) {

    const getFullInfoClinic = async (store, route) => {
        try {
            const city = route.query.city
            const clinicBranch = route.params.id
            const clinicId = route.query.clinic

            const url = config.apiUrl + `/clinics/${clinicId}/full-info`

            const response = await axios.get(url, {
                params: {city, clinicBranch}
            })
            const data = response.data

            clinic.value.avatar = data.avatar
            clinic.value.clinicId = data.clinicId
            clinic.value.city = data.city
            clinic.value.clinicBranchId = data.clinicBranchId
            clinic.value.name = data.name
            clinic.value.type = data.type
            clinic.value.description = data.description
            clinic.value.address = data.address
            clinic.value.conveniences = data.conveniences
            clinic.value.schedule = buildSchedule(data.schedule)
        } catch (err) {
            store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
        }
    }

    return {
        getFullInfoClinic
    }
}

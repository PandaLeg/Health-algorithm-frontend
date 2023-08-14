import {onMounted} from "vue";
import {config} from "../../../util/config";
import axios from "axios";
import {vuexTypes} from "../../../store/vuexTypes";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import buildSchedule from "./build-schedule";

export default function (clinic) {
    const store = useStore()
    const route = useRoute()

    onMounted(async () => {
        try {
            const city = route.query.city
            const clinicBranch = route.query.branch
            const clinicId = route.params.id

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
    })

}

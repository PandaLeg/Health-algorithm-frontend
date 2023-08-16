import {config} from "../../../util/config";
import axios from "axios";
import {vuexTypes} from "../../../store/vuexTypes";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import buildSchedule from "./build-schedule";

export default function (currentClinic, clinics, page, perPage, totalPages) {
    const store = useStore()
    const route = useRoute()

    const getClinicsWithoutCurrent = async () => {
        try {
            const city = route.query.city
            const clinicBranch = route.query.branch
            const clinicId = route.params.id

            const url = config.apiUrl + `/clinics/full-info`

            const response = await axios.get(url, {
                params: {
                    id: clinicId,
                    city: city,
                    clinicBranch,
                    page: page.value - 1,
                    perPage: perPage.value
                }
            })
            const data = response.data

            clinics.value = data.clinics.map(clinic => ({
                clinicId: currentClinic.value.clinicId,
                city: currentClinic.value.city,
                clinicBranchId: clinic.clinicBranchId,
                type: currentClinic.value.type,
                address: clinic.address,
                conveniences: clinic.conveniences,
                schedule: buildSchedule(clinic.schedule)
            }))

            totalPages.value = data.totalPages
        } catch (err) {
            console.log(err)
            store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
        }
    }

    return {
        getClinicsWithoutCurrent
    }
}

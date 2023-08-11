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
            const address = route.query.address
            const clinicId = route.params.id

            const url = config.apiUrl + `/clinics/full-info`

            const response = await axios.get(url, {
                params: {
                    id: clinicId,
                    city: city,
                    address,
                    page: page.value - 1,
                    perPage: perPage.value
                }
            })
            const data = response.data

            clinics.value = data.clinics.map(clinic => ({
                avatar: currentClinic.avatar,
                clinicId: currentClinic.clinicId,
                city: currentClinic.city,
                addressId: clinic.addressId,
                type: currentClinic.type,
                address: clinic.address,
                schedule: buildSchedule(data.schedule)
            }))

            totalPages.value = data.totalPages
        } catch (err) {
            store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
        }
    }

    return {
        getClinicsWithoutCurrent
    }
}

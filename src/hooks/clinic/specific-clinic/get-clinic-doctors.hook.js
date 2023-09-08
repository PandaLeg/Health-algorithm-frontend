import {config} from "../../../util/config";
import axios from "axios";
import {vuexTypes} from "../../../store/vuexTypes";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default function (doctors, doctorPage, doctorPerPage, doctorTotalPages) {
    const store = useStore()
    const route = useRoute()

    const getDoctors = async () => {
        try {
            const clinicBranchId = route.query.branch
            const url = config.apiUrl + `/clinic-branches/${clinicBranchId}/doctors`

            const response = await axios.get(url, {
                params: { page: doctorPage.value - 1, perPage: doctorPerPage.value }
            })
            const data = response.data

            doctors.value = data.doctors
            doctorTotalPages.value = data.totalPages
        } catch (err) {
            store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
        }
    }

    const nextDoctorPage = async (currentPage) => {
        doctorPage.value = currentPage
        await getDoctors()
    }

    return {
        getDoctors,
        nextDoctorPage
    }
}

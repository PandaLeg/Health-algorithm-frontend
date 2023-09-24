import {config} from "../../../util/config";
import axios from "axios";
import {vuexTypes} from "../../../store/vuex-types";
import {useStore} from "vuex";
import {onMounted} from "vue";

export default function (page, perPage, totalPages, doctors, searchDoctorInfo, currentCity, countDoctors, isLoading) {
    const store = useStore()

    const search = async () => {
        try {
            isLoading.value = true
            const url = config.apiUrl + '/doctors/search'

            const city = searchDoctorInfo.city ? searchDoctorInfo.city : currentCity.value

            const response = await axios.get(url, {
                params: {
                    page: page.value - 1,
                    perPage: perPage.value,
                    city,
                    specialtyId: searchDoctorInfo.specialty,
                    doctorNameId: searchDoctorInfo.doctorName
                }
            })
            const data = response.data

            doctors.value = data.doctors
            totalPages.value = data.totalPages
            countDoctors.value = data.count
            currentCity.value = city
        } catch (err) {
            store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
        } finally {
            isLoading.value = false
        }
    }

    onMounted(search)

    const nextPage = async (currentPage) => {
        page.value = currentPage
        await search()
    }

    return {
        search,
        nextPage
    }
}

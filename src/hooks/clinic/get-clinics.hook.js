import {useStore} from "vuex";
import {config} from "../../util/config";
import {vuexTypes} from "../../store/vuexTypes";
import {onMounted} from "vue";
import axios from "axios";

export default function (clinics, page, perPage, totalPages, clinicInfo) {
    const store = useStore()

    const getClinics = async () => {
        try {
            const city = clinicInfo.city? clinicInfo.city : 'kyiv'
            const url = config.apiUrl + `/clinics/${city}`

            const response = await axios.get(url, {
                params: {page: page.value - 1, perPage: perPage.value}
            })
            const data = response.data

            clinics.value = data.clinics
            totalPages.value = data.totalPages
        } catch (err) {
            store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
        }
    }

    const getClinic = async () => {
        try {
            const city = clinicInfo.city
            const clinic = clinicInfo.clinic

            const url = config.apiUrl + `/clinics/${city}/${clinic}`

            const response = await axios.get(url)
            const data = response.data

            clinics.value = []
            clinics.value.push(data)

            page.value = 1
            perPage.value = 5
            totalPages.value = 0
        } catch (err) {
            store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
        }
    }

    onMounted(getClinics)

    const nextPage = async (currentPage) => {
        page.value = currentPage
        await getClinics()
    }

    return {
        nextPage,
        getClinics,
        getClinic
    }
}

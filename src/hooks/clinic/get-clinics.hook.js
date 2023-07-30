import {useStore} from "vuex";
import {config} from "../../util/config";
import authAxios from "../../http";
import {vuexTypes} from "../../store/vuexTypes";
import {onMounted} from "vue";

export default function (clinics, page, perPage, totalPages) {
    const store = useStore()

    const getClinics = async (city = 'Sloviansk') => {
        try {
            const url = config.apiUrl + `/clinics/${city}`

            const response = await authAxios.get(url, {
                params: {page: page.value - 1, perPage: perPage.value}
            })
            const data = response.data

            clinics.value = data.clinics
            totalPages.value = data.totalPages
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
        nextPage
    }
}

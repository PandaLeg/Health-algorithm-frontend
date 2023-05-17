import {onMounted} from "vue";
import {config} from "../../util/config";
import authAxios from "../../http";
import {vuexTypes} from "../../store/vuexTypes";
import {useStore} from "vuex";

export default function (page, perPage, totalPages, doctors, isLoading) {
    const store = useStore()

    const getDoctors = async () => {
        try {
            isLoading.value = true
            const url = config.apiUrl + '/doctors'

            const response = await authAxios.get(url, {
                params: {page: page.value - 1, perPage: perPage.value}
            })
            const data = response.data

            doctors.value = data.doctors
            totalPages.value = data.totalPages
        } catch (err) {
            store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
            console.log(err)
        } finally {
            isLoading.value = false
        }
    }

    onMounted(getDoctors)
}

import {vuexTypes} from "../../store/vuexTypes";
import {useStore} from "vuex";
import {config} from "../../util/config";
import {onMounted} from "vue";
import authAxios from "../../http";

export default function (appointments, page, perPage, totalPages) {
    const store = useStore()
    const user = store.getters[vuexTypes.user]

    const getAppointments = async () => {

        try {
            const url = config.apiUrl + `/appointments`

            const response = await authAxios.get(url, {
                params: {
                    id: user.id,
                    page: page.value - 1,
                    perPage: perPage.value
                }
            })
            const data = response.data

            appointments.value = data.appointments
            totalPages.value = data.totalPages
        } catch (err) {
            store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
        }
    }

    onMounted(getAppointments)

    const nextPage = async (currentPage) => {
        page.value = currentPage
        await getAppointments()
    }

    return {
        nextPage
    }
}

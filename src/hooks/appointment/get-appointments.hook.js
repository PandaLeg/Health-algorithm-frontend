import {vuexTypes} from "../../store/vuex-types";
import {useStore} from "vuex";
import {config} from "../../util/config";
import {onMounted} from "vue";
import authAxios from "../../http";
import {useRouter} from "vue-router";
import routesNames from "../../router/routes-names";

export default function (appointments, page, perPage, totalPages) {
    const store = useStore()
    const router = useRouter()
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
            const response = err.response

            if (response.status === 403) {
                router.push({name: routesNames.home.name})
            }

            store.commit(vuexTypes.UPDATE_NOTIFICATION, response.data.message ?? 'Error')
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

import {config} from "../../../util/config";
import axios from "axios";
import {vuexTypes} from "../../../store/vuexTypes";
import {useStore} from "vuex";

export default function (page, perPage, totalPages, doctors, searchDoctorInfo, isLoading, v$) {
    const store = useStore()

    const search = async () => {
        v$.value.$touch()

        if (!v$.value.$invalid && !v$.value.city.$error) {
            try {
                isLoading.value = true
                const url = config.apiUrl + '/doctors/search'

                const response = await axios.get(url, {
                    params: {
                        page: page.value - 1,
                        perPage: perPage.value,
                        city: searchDoctorInfo.city,
                        specialtyId: searchDoctorInfo.specialty,
                        doctorNameId: searchDoctorInfo.doctorName
                    }
                })
                const data = response.data

                doctors.value = data.doctors
                totalPages.value = data.totalPages
            } catch (err) {
                store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
            } finally {
                isLoading.value = false
            }
        }
    }

    return {
        search
    }
}

import {onMounted} from "vue";
import {config} from "../../../util/config";
import axios from "axios";
import {vuexTypes} from "../../../store/vuexTypes";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default function (clinic) {
    const store = useStore()
    const route = useRoute()

    onMounted(async () => {
        try {
            const city = route.query.city
            const address = route.query.address
            const clinicId = route.params.id

            const url = config.apiUrl + `/clinics/${clinicId}/full-info`

            const response = await axios.get(url, {
                params: {city, address}
            })
            const data = response.data

            clinic.avatar = data.avatar
            clinic.clinicId = data.clinicId
            clinic.city = data.city
            clinic.addressId = data.addressId
            clinic.name = data.name
            clinic.type = data.type
            clinic.description = data.description
            clinic.address = data.address
            clinic.schedule = data.schedule.map(el => {
                let weekDay

                if (el.weekDays.length > 1) {
                    weekDay = el.weekDays[0] + '-' + el.weekDays[el.weekDays.length - 1]
                } else {
                    weekDay = el.weekDays[0]
                }

                const resultSchedule = el.dayType === 'Workday' ? weekDay + ': ' + el.time : weekDay + ': ' + el.dayType


                return {
                    id: el.weekDayId,
                    addressInfo: resultSchedule
                }
            })
        } catch (err) {
            store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
        }
    })

}

import {toRef, watch} from "vue";
import {config} from "../../../util/config";
import axios from "axios";

export default function (modelSearchDoctorName, props, emit) {
    const city = toRef(props, 'city')
    const specialtyId = toRef(props, 'specialty')

    watch(modelSearchDoctorName, async (value) => {
        try {
            const url = config.apiUrl + '/doctors/names'
            const response = await axios.get(url, {
                params: {
                    lastName: value,
                    city: city.value,
                    specialtyId: specialtyId.value
                }
            })

            const names = response.data.map(el => ({
                doctorId: el.userId,
                name: el.firstName + ' ' + el.lastName,
                lastName: el.lastName
            }))

            emit('update:names', names)
        } catch (err) {
            console.log(err)
        }
    })
}

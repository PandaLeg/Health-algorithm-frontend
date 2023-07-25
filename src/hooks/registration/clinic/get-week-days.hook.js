import {onMounted} from "vue";
import {config} from "../../../util/config";
import axios from "axios";

export default function (weekDays) {
    onMounted(async () => {
        try {
            const url = config.apiUrl + '/week-day'
            const response = await axios.get(url)

            weekDays.value = response.data
        } catch (err) {
            console.log(err)
        }
    })
}

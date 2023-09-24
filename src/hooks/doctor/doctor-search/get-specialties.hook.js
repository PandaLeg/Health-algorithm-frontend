import {onMounted} from "vue";
import {config} from "../../../util/config";
import axios from "axios";

export default function (specialties) {
    onMounted(async () => {
        try {
            const url = config.apiUrl + '/specialties'
            const response = await axios.get(url)

            specialties.value = response.data
        } catch (err) {
            console.log(err)
        }
    })
}

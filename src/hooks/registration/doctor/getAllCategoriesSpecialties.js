import axios from "axios";
import {config} from "../../../util/config";
import {onMounted} from "vue";

export default function (specialtiesFromDb, categories) {

    onMounted(async () => {
        try {
            const url = config.apiUrl + '/doctors/categories-specialties'
            const response = await axios.get(url)
            const data = response.data

            categories.value = data.categories
            specialtiesFromDb.value = data.specialties
        } catch (err) {
            console.log(err)
        }
    })

}

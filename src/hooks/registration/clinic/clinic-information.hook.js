import {onMounted} from "vue";
import {config} from "../../../util/config";
import axios from "axios";

function getClinicInformation(reqUrl, entity) {
    onMounted(async () => {
        try {
            const url = config.apiUrl + reqUrl
            const response = await axios.get(url)

            entity.value = response.data
        } catch (err) {
            console.log(err)
        }
    })
}

export function getWeekDays (weekDays) {
    getClinicInformation('/week-days', weekDays)
}

export function getConveniences (conveniencesFromDb) {
    getClinicInformation('/conveniences', conveniencesFromDb)
}

export function getClinicTypes (clinicTypes) {
    getClinicInformation('/clinic-types', clinicTypes)
}

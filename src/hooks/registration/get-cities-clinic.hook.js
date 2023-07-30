import {computed, toRef, watch} from "vue";
import axios from "axios";
import {config} from "../../util/config";

export function watchAndGetCities(props) {
    const searchCity = computed(() => props.item.searchCity)

    watch(searchCity, async (value) => {
        const query = value + ' ' + 'UA'
        const url = config.geoNameApiUrl + `/?dataset=geonames-all-cities-with-a-population-1000&q=${query}&sort=name&facet=feature_code&facet=cou_name_en&facet=timezone`
        const response = await axios.get(url)

        const data = response.data

        const cities = data.records.map(el => el.fields)
        props.item.cities = cities
    })
}

export function watchAndGetClinics(props) {
    const searchClinic = computed(() => props.item.searchClinic)

    watch(searchClinic, async (value) => {
        const url = config.apiUrl + '/clinics/by-city-and-name'
        const response = await axios.get(url, {
            params: {
                name: value,
                city: props.item.city
            }
        })

        props.item.clinics = response.data
    })
}

export function watchAndGetAddresses(props) {
    const name = toRef(props.item, 'name')

    watch(name, async (value) => {
        if (!value) return

        const url = config.apiUrl + '/clinics/addresses'
        const response = await axios.get(url, {
            params: {
                clinicId: value,
                city: props.item.city
            }
        })

        props.item.addresses = response.data
    })
}

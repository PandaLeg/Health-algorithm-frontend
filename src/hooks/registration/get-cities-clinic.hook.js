import {computed, toRef, watch} from "vue";
import axios from "axios";
import {config} from "../../util/config";

export function watchAndGetCities(item) {
    const searchCity = computed(() => item.searchCity)

    watch(searchCity, async (value) => {
        const query = value + ' ' + 'UA'
        const url = config.geoNameApiUrl + `/?dataset=geonames-all-cities-with-a-population-1000&q=${query}&sort=name&facet=feature_code&facet=cou_name_en&facet=timezone`
        const response = await axios.get(url)

        const data = response.data

        const citiesFromDb = data.records.map(el => el.fields)
        item.cities = citiesFromDb
    })
}

export function watchAndGetClinics(item) {
    const searchClinic = computed(() => item.searchClinic)

    watch(searchClinic, async (value) => {
        const url = config.apiUrl + '/clinics/by-city-and-name'
        const response = await axios.get(url, {
            params: {
                name: value,
                city: item.city
            }
        })

        item.clinics = response.data
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

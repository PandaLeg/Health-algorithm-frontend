import {toRef, watch} from "vue";
import axios from "axios";
import {config} from "../../util/config";

export function watchAndGetCities(modelSearchCity, emit) {

    watch(modelSearchCity, async (value) => {
        const query = value + ' ' + 'UA'
        const url = config.geoNameApiUrl + `/?dataset=geonames-all-cities-with-a-population-1000&q=${query}&sort=name&facet=feature_code&facet=cou_name_en&facet=timezone`
        const response = await axios.get(url)

        const data = response.data

        const citiesFromDb = data.records.map(el => el.fields)

        emit('update:searched-cities', citiesFromDb)
    })
}

export function watchAndGetClinics(modelSearchClinic, city, emit) {

    watch(modelSearchClinic, async (value) => {
        const url = config.apiUrl + '/clinics/names'
        const response = await axios.get(url, {
            params: {
                name: value,
                city: city.value
            }
        })

        emit('update:searched-clinics', response.data)
    })
}

export function watchAndGetAddresses(modelClinicName, city, emit) {

    watch(modelClinicName, async (value) => {
        if (!value) return

        const url = config.apiUrl + '/clinic-branches/addresses'
        const response = await axios.get(url, {
            params: {
                clinicId: value,
                city: city.value
            }
        })

        const addresses = response.data.map(branch => ({id: branch.id, address: branch.address}))
        emit('update:addresses', addresses)
        emit('update:clinic-branches', response.data)
    })
}

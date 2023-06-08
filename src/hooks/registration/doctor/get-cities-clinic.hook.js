import {computed, watch} from "vue";
import axios from "axios";
import {config} from "../../../util/config";

export default function (props, emit) {
    const searchCity = computed(() => props.item.searchCity)
    const searchClinic = computed(() => props.item.searchClinic)
    const modelPlaces = computed({
        get() {
            return props.places
        },

        set(value) {
            const place = {id: props.item.id, name: value}

            const places = props.places

            const placeIndex = places.findIndex(el => el.id === props.item.id)

            if (placeIndex !== -1) {
                places.splice(placeIndex, 1)
                emit('update:places', places)
            } else {
                const newPlaces = [...props.places, place]
                emit('update:places', newPlaces)
            }
        }
    })

    watch(searchCity, async (value) => {
        if (!value) {
            const places = props.places

            const placeIndex = places.findIndex(el => el.id === props.item.id)

            if (placeIndex !== -1) {
                places.splice(placeIndex, 1)
                emit('update:places', places)
            }
        }

        const query = value + ' ' + 'UA'
        const url = config.geoNameApiUrl + `/?dataset=geonames-all-cities-with-a-population-1000&q=${query}&sort=name&facet=feature_code&facet=cou_name_en&facet=timezone`
        const response = await axios.get(url)

        const data = response.data

        const cities = data.records.map(el => el.fields)
        props.item.cities = cities
    })

    watch(searchClinic, async (value) => {
        const url = config.apiUrl + '/clinics/by-query'
        const response = await axios.get(url, {
            params: {
                name: value,
                city: props.item.city
            }
        })

        const clinics = response.data
        props.item.clinics = clinics
    })

    return {
        modelPlaces
    }
}

import {reactive} from "vue";

export default function (locations, locationVuelidate) {
    const addLocation = () => {
        let id = locations.value[locations.value.length - 1].id
        const field = reactive({
            id: ++id,
            city: null,
            searchCity: '',
            cities: [],
            address: null
        })
        locations.value.push(field)
    }

    const deleteLocation = (item) => {
        const itemIndex = locations.value.findIndex(el => el.id === item.id)

        if (itemIndex !== -1 && locations.value.length > 1) {
            locations.value.splice(itemIndex, 1)
            locationVuelidate.value.splice(itemIndex, 1)
        }
    }

    return {
        addLocation,
        deleteLocation
    }
}

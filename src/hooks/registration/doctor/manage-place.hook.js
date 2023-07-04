import {reactive} from "vue";

export default function (contentFields, workPlaceVuelidate) {
    const addPlace = () => {
        let id = contentFields.value[contentFields.value.length - 1].id
        const field = reactive({
            id: ++id,
            city: null,
            name: null,
            address: null,
            searchCity: '',
            searchClinic: '',
            searchAddress: '',
            cities: [],
            clinics: [],
            addresses: []
        })
        contentFields.value.push(field)
    }

    const deletePlace = (item) => {
        const itemIndex = contentFields.value.findIndex(el => el.id === item.id)

        if (itemIndex !== -1 && contentFields.value.length > 1) {
            contentFields.value.splice(itemIndex, 1)
            workPlaceVuelidate.value.splice(itemIndex, 1)
        }
    }

    return {
        addPlace,
        deletePlace
    }
}

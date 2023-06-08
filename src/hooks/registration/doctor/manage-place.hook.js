import {reactive} from "vue";

export default function (contentFields, user) {
    const addPlace = () => {
        let id = contentFields.value[contentFields.value.length - 1].id
        const field = reactive({
            id: ++id,
            city: null,
            searchCity: '',
            searchClinic: '',
            cities: [],
            clinics: []
        })
        contentFields.value.push(field)
    }

    const deletePlace = (item) => {
        const itemIndex = contentFields.value.findIndex(el => el.id === item.id)
        const placeIndex = user.doctor.places.findIndex(el => el.id === item.id)

        if (itemIndex !== -1 && contentFields.value.length > 1) {
            contentFields.value.splice(itemIndex, 1)
        }

        if (placeIndex !== -1) {
            user.doctor.places.splice(placeIndex, 1)
        }
    }

    return {
        addPlace,
        deletePlace
    }
}

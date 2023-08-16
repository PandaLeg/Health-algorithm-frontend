export default function (contentFields, workPlaceVuelidate) {
    const addPlace = () => {
        let id = contentFields[contentFields.length - 1].id
        const field = {
            id: ++id,
            city: null,
            clinicName: null,
            address: null,
            searchCity: '',
            searchClinic: '',
            searchedCities: [],
            searchedClinics: [],
            addresses: []
        }

        contentFields.push(field)
    }

    const deletePlace = (item) => {
        const itemIndex = contentFields.findIndex(el => el.id === item.id)

        if (itemIndex !== -1 && contentFields.length > 1) {
            contentFields.splice(itemIndex, 1)
            workPlaceVuelidate.value.splice(itemIndex, 1)
        }
    }

    return {
        addPlace,
        deletePlace
    }
}

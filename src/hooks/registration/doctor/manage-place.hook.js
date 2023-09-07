export default function (workPlaces, workPlaceVuelidate) {
    const addPlace = () => {
        let id = workPlaces[workPlaces.length - 1].id
        const schedule = []

        const fieldSchedule = {
            id: 1,
            weekDay: null,
            duration: '',
            from: null,
            to: null
        }

        schedule.push(fieldSchedule)

        const field = {
            id: ++id,
            city: null,
            clinicName: null,
            address: null,
            searchCity: '',
            searchClinic: '',
            searchedCities: [],
            searchedClinics: [],
            clinicBranches: [],
            addresses: [],
            days: [],
            schedule
        }

        workPlaces.push(field)
    }

    const deletePlace = (item) => {
        const itemIndex = workPlaces.findIndex(el => el.id === item.id)

        if (itemIndex !== -1 && workPlaces.length > 1) {
            workPlaces.splice(itemIndex, 1)
            workPlaceVuelidate.value.splice(itemIndex, 1)
        }
    }

    return {
        addPlace,
        deletePlace
    }
}

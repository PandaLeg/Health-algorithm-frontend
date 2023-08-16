import dayInformation from "../../../util/dayInformation.json";

export default function (locations, locationVuelidate, weekDays, conveniencesFromDb) {
    const addLocation = () => {
        let id = locations[locations.length - 1].id
        const schedule = []

        const convenienceItems = conveniencesFromDb.value.map(el => ({id: el.id, name: el.name}))
        const days = weekDays.value.map(el => ({id: el.id, name: el.name}))
        const dayTypes = dayInformation.dayTypes.map(el => ({...el}))

        const fieldSchedule = {
            id: 1,
            weekDays: [],
            dayType: null,
            types: dayTypes,
            from: null,
            to: null
        }

        schedule.push(fieldSchedule)

        const field = {
            id: ++id,
            city: null,
            searchCity: '',
            searchedCities: [],
            address: null,
            conveniences: [],
            convenienceItems,
            days,
            schedule
        }

        locations.push(field)
    }

    const deleteLocation = (item) => {
        const itemIndex = locations.findIndex(el => el.id === item.id)

        if (itemIndex !== -1 && locations.length > 1) {
            locations.splice(itemIndex, 1)
            locationVuelidate.value.splice(itemIndex, 1)
        }
    }

    return {
        addLocation,
        deleteLocation
    }
}

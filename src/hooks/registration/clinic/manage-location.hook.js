import {reactive} from "vue";
import dayInformation from "../../../util/dayInformation.json";

export default function (locations, locationVuelidate, weekDays) {
    const addLocation = () => {
        let id = locations.value[locations.value.length - 1].id
        const schedule = []

        const days = weekDays.value.map(el => ({...el}))
        const dayTypes = dayInformation.dayTypes.map(el => ({...el}))

        const fieldSchedule = {
            id: 1,
            weekDays: [],
            days,
            dayType: null,
            types: dayTypes,
            from: null,
            to: null
        }

        schedule.push(fieldSchedule)

        const field = reactive({
            id: ++id,
            city: null,
            searchCity: '',
            cities: [],
            address: null,
            schedule
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

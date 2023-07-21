import {reactive} from "vue";
import dayInformation from "../../../util/dayInformation.json";

export default function (locations, locationVuelidate) {
    const addLocation = () => {
        let id = locations.value[locations.value.length - 1].id
        const workingHours = []

        const days = dayInformation.days.map(el => Object.assign({}, el))
        const dayTypes = dayInformation.dayTypes.map(el => Object.assign({}, el))

        const fieldWorkingHour = {
            id: 1,
            weekDay: null,
            days,
            dayType: null,
            types: dayTypes,
            from: null,
            to: null
        }

        workingHours.push(fieldWorkingHour)

        const field = reactive({
            id: ++id,
            city: null,
            searchCity: '',
            cities: [],
            address: null,
            workingHours
        })

        locations.value.push(field)
    }

    const deleteLocation = (item) => {
        const itemIndex = locations.value.findIndex(el => el.id === item.id)

        if (itemIndex !== -1 && locations.value.length > 1) {
            locations.value.splice(1, 1)
            locationVuelidate.value.splice(1, 1)
        }
    }

    return {
        addLocation,
        deleteLocation
    }
}

import {reactive, toRef} from "vue";
import dayInformation from "../../../util/dayInformation.json";

export default function (props, workingHourRule) {
    const workingHours = toRef(props.item, 'workingHours')

    const addSchedule = () => {

        let id = workingHours.value[workingHours.value.length - 1].id

        const days = dayInformation.days.map(el => Object.assign({}, el))
        const dayTypes = dayInformation.dayTypes.map(el => Object.assign({}, el))

        const field = reactive({
            id: ++id,
            weekDay: null,
            days,
            dayType: null,
            types: dayTypes,
            from: null,
            to: null
        })


        workingHours.value.push(field)
    }

    const deleteSchedule = (item) => {
        const itemIndex = workingHours.value.findIndex(el => el.id === item.id)

        if (itemIndex !== -1 && workingHours.value.length > 1) {
            workingHours.value.splice(itemIndex, 1)
        }
    }


    return {
        addSchedule,
        deleteSchedule
    }
}

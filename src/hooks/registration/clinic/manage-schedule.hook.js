import {reactive, toRef} from "vue";
import dayInformation from "../../../util/dayInformation.json";

export default function (props) {
    const schedule = toRef(props.item, 'schedule')

    const addSchedule = () => {

        let id = schedule.value[schedule.value.length - 1].id

        const days = props.weekDays.map(el => ({...el}))
        const dayTypes = dayInformation.dayTypes.map(el => ({...el}))

        const field = reactive({
            id: ++id,
            weekDays: [],
            days,
            dayType: null,
            types: dayTypes,
            from: null,
            to: null
        })


        schedule.value.push(field)
    }

    const deleteSchedule = (item) => {
        const itemIndex = schedule.value.findIndex(el => el.id === item.id)

        if (itemIndex !== -1 && schedule.value.length > 1) {
            schedule.value.splice(itemIndex, 1)
        }
    }


    return {
        addSchedule,
        deleteSchedule
    }
}

import dayInformation from "../../../util/dayInformation.json";
import cloneDeep from 'lodash/cloneDeep'

export default function (props, emit) {
    const schedule = props.schedule

    const addSchedule = () => {
        let id = schedule[schedule.length - 1].id

        const dayTypes = dayInformation.dayTypes.map(el => ({...el}))

        const field = {
            id: ++id,
            weekDays: [],
            dayType: null,
            types: dayTypes,
            from: null,
            to: null
        }

        const newSchedule = cloneDeep(schedule)
        newSchedule.push(field)
        emit('update:schedule', newSchedule)
    }

    const deleteSchedule = (item) => {
        const itemIndex = schedule.findIndex(el => el.id === item.id)

        if (itemIndex !== -1 && schedule.length > 1) {
            const newSchedule = cloneDeep(schedule)
            newSchedule.splice(itemIndex, 1)

            emit('update:schedule', newSchedule)
        }
    }


    return {
        addSchedule,
        deleteSchedule
    }
}

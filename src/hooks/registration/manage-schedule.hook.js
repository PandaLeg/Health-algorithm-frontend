import dayInformation from "../../util/dayInformation.json";
import cloneDeep from 'lodash/cloneDeep'
import {toRef} from "vue";

export default function (props, emit, scheduleVuelidate) {
    const schedule = toRef(props, 'schedule')

    const addClinicSchedule = () => {
        let id = schedule.value[schedule.value.length - 1].id

        const dayTypes = dayInformation.dayTypes.map(el => ({...el}))

        const field = {
            id: ++id,
            weekDays: [],
            dayType: null,
            types: dayTypes,
            from: null,
            to: null
        }

        const newSchedule = cloneDeep(schedule.value)
        newSchedule.push(field)
        emit('update:schedule', newSchedule)
    }

    const addDoctorSchedule = () => {
        let id = schedule.value[schedule.value.length - 1].id

        const field = {
            id: ++id,
            weekDay: null,
            duration: '',
            from: null,
            to: null
        }

        const newSchedule = cloneDeep(schedule.value)
        newSchedule.push(field)
        emit('update:schedule', newSchedule)
    }

    const deleteSchedule = (item) => {
        const itemIndex = schedule.value.findIndex(el => el.id === item.id)

        if (itemIndex !== -1 && schedule.value.length > 1) {
            const newSchedule = cloneDeep(schedule.value)
            newSchedule.splice(itemIndex, 1)
            scheduleVuelidate.value.splice(itemIndex + 1, 1)

            emit('update:schedule', newSchedule)
        }
    }


    return {
        addClinicSchedule,
        addDoctorSchedule,
        deleteSchedule
    }
}

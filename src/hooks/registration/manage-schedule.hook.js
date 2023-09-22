import dayInformation from "../../util/dayInformation.json";
import cloneDeep from 'lodash/cloneDeep'
import {toRef} from "vue";

function updateSchedule(schedule, field, emit) {
    const newSchedule = cloneDeep(schedule.value)
    newSchedule.push(field)
    emit('update:schedule', newSchedule)
}

export function manageClinicSchedule(props, emit, scheduleVuelidate) {
    const schedule = toRef(props, 'schedule')

    const addSchedule = () => {
        let id = schedule.value[schedule.value.length - 1].id

        const dayTypes = dayInformation.dayTypes.map(el => ({...el}))

        const field = {
            id: ++id,
            weekDays: [],
            dayType: '',
            types: dayTypes,
            from: '',
            to: ''
        }

        updateSchedule(schedule, field, emit)
    }

    const deleteSchedule = (item) => {
        const itemIndex = schedule.value.findIndex(el => el.id === item.id)

        if (itemIndex !== -1 && schedule.value.length > 1) {
            const newSchedule = cloneDeep(schedule.value)
            newSchedule.splice(itemIndex, 1)

            const scheduleVuelidateIndex = itemIndex + 1
            scheduleVuelidate.value.splice(scheduleVuelidateIndex, 1)

            emit('update:schedule', newSchedule)
        }
    }


    return {
        addSchedule,
        deleteSchedule
    }
}

export function manageDoctorSchedule(props, emit) {
    const schedule = toRef(props, 'schedule')

    const addSchedule = () => {
        let id = schedule.value[schedule.value.length - 1].id

        const field = {
            id: ++id,
            weekDay: null,
            duration: '',
            from: '',
            to: ''
        }

        updateSchedule(schedule, field, emit)
    }

    const deleteSchedule = (item) => {
        const itemIndex = schedule.value.findIndex(el => el.id === item.id)

        if (itemIndex !== -1 && schedule.value.length > 1) {
            const newSchedule = cloneDeep(schedule.value)
            newSchedule.splice(itemIndex, 1)

            const scheduleVuelidate = props.locationVuelidate
            scheduleVuelidate.splice(itemIndex, 1)

            emit('update:location-vuelidate', [...scheduleVuelidate])
            emit('update:schedule', newSchedule)
        }
    }


    return {
        addSchedule,
        deleteSchedule
    }
}

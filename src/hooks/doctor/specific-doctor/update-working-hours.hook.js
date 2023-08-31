import {toRef, watch} from "vue";
import axios from "axios";
import {config} from "../../../util/config";

export default function (modelDateAppointment, modelClinicBranch, modelTime, props, emit) {
    const appointmentSchedule = toRef(props, 'appointmentSchedule')

    watch(modelDateAppointment, async (val) => {
        if (!val) return

        const doctorWorkPlace = appointmentSchedule.value.find(sh => sh.clinicBranchId === modelClinicBranch.value)
        const dayOfAppointment = new Date(val)
        const schedule = doctorWorkPlace.schedule.find(el => el.weekDayId === dayOfAppointment.getDay())

        let appointmentTime = {}

        try {
            const url = config.apiUrl + '/appointments/times'
            const response = await axios.get(url, {
                params: {date: val}
            })

            const workingHours = response.data

            for (const workingHour of workingHours) {
                const newFormatTime = workingHour.substring(0, 5)
                appointmentTime[newFormatTime] = newFormatTime
            }
        } catch (err) {
            console.log(err)
        }

        const workingHours = schedule?.workingHours.reduce((acc, workingHour) => {
            const today = new Date()
            const isSameDate =
                dayOfAppointment.getDate() === today.getDate() &&
                dayOfAppointment.getMonth() === today.getMonth() &&
                dayOfAppointment.getFullYear() === today.getFullYear();
            const timePassed = isSameDate && (today.valueOf() > workingHour.milliseconds)

            return workingHour.time === appointmentTime[workingHour.time] || timePassed || dayOfAppointment < today ? acc : [...acc, workingHour.time]
        }, []) ?? []

        emit('update:working-hours', workingHours)
        modelTime.value = null
    })
}

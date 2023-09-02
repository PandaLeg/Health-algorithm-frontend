import {toRef, watch} from "vue";
import {config} from "../../../util/config";
import authAxios from "../../../http";

export default function (modelDateAppointment, modelTime, getDoctor, props, emit, doctorId) {
    const appointmentSchedule = toRef(props, 'appointmentSchedule')

    watch(modelDateAppointment, async (val) => {
        if (!val) return

        const doctor = getDoctor(appointmentSchedule)
        const dayOfAppointment = new Date(val)
        const schedule = doctor.schedule.find(el => el.weekDayId === dayOfAppointment.getDay())

        let appointmentTime = {}

        try {
            const url = config.apiUrl + '/appointments/times'
            const response = await authAxios.get(url, {
                params: {date: val, doctorId: doctorId.value}
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

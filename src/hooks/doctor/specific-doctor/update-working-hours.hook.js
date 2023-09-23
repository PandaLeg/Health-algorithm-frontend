import {toRef, watch} from "vue";
import {config} from "../../../util/config";
import authAxios from "../../../http";
import moment from "moment-timezone";

export default function (modelDateAppointment, modelTime, getDoctor, props, emit, doctorId) {
    const appointmentSchedule = toRef(props, 'appointmentSchedule')
    const timezone = 'Europe/Kiev';

    watch(modelDateAppointment, async (val) => {
        if (!val) return

        const doctor = getDoctor(appointmentSchedule)
        let dayOfAppointment = moment.tz(val, 'yyyy-MM-DD', timezone)
        const schedule = doctor.schedule.find(el => el.weekDayId === dayOfAppointment.day())

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
            const today = moment.tz(timezone);
            const toTime = moment.tz(workingHour.time, 'HH:mm:ss', timezone);

            const isSameDate =
                dayOfAppointment.toDate().getDate() === today.toDate().getDate() &&
                dayOfAppointment.toDate().getMonth() === today.toDate().getMonth() &&
                dayOfAppointment.toDate().getFullYear() === today.toDate().getFullYear();
            const timePassed = isSameDate && (today.valueOf() > workingHour.milliseconds)

            const currentDayOfAppointment = moment.tz(dayOfAppointment, timezone).set({
                hour: toTime.hours(),
                minutes: toTime.minutes()
            });

            return workingHour.time === appointmentTime[workingHour.time] ||
            timePassed ||
            currentDayOfAppointment.isBefore(today) ? acc : [...acc, workingHour.time]
        }, []) ?? []

        emit('update:working-hours', workingHours)
        modelTime.value = null
    })
}

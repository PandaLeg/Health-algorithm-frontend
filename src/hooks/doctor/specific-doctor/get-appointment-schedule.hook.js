import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {config} from "../../../util/config";
import {vuexTypes} from "../../../store/vuexTypes";
import moment from "moment";
import authAxios from "../../../http";

export default function (clinicBranches, emit, store) {
    const route = useRoute()

    const getAppointmentSchedule = async () => {
        try {
            const doctorId = route.params.id;
            const url = config.apiUrl + `/doctors/70bb8691-ccf1-4353-8bd4-1b1d047bb517/schedule`

            const response = await authAxios.get(url, {
                params: {clinicBranches: JSON.stringify(clinicBranches)}
            })
            const data = formatAppointmentDate(response.data)

            emit('update:appointment-schedule', data)
        } catch (err) {
            store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
        }
    }

    return {
        getAppointmentSchedule
    }
}


function formatAppointmentDate(appointmentSchedule) {
    const newAppointmentSchedule = []

    for (const appointment of appointmentSchedule) {
        const doctorSchedule = []

        for (const schedule of appointment.schedule) {
            const from = moment(schedule.from, 'HH:mm:ss')
            const to = moment(schedule.to, 'HH:mm:ss')
            const workingHours = [
                { time: from.format('HH:mm'), milliseconds: from.valueOf() },
            ]

            for (let i = 0; from < to; i++) {
                const time = from.add(schedule.duration, 'h')
                const timeFormat = time.format('HH:mm')

                const isPossibleAppointment = moment(time).add(
                    schedule.duration,
                    'h',
                )

                if (
                    timeFormat < to.format('HH:mm') &&
                    isPossibleAppointment.format('HH:mm') <= to.format('HH:mm')
                ) {
                    workingHours.push({
                        time: timeFormat,
                        milliseconds: time.valueOf()
                    })
                }
            }

            doctorSchedule.push({
                workingHours,
                weekDayId: schedule.weekDay.id,
                weekDayName: schedule.weekDay.name
            });
        }

        const newAppointment = {
            clinicBranchId: appointment.clinicBranchId,
            schedule: doctorSchedule
        }

        newAppointmentSchedule.push(newAppointment)
    }

    return newAppointmentSchedule
}

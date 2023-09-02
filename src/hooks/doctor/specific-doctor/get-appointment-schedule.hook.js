import {useRoute} from "vue-router";
import {config} from "../../../util/config";
import {vuexTypes} from "../../../store/vuexTypes";
import moment from "moment";
import authAxios from "../../../http";

export default function (emit, store) {
    const route = useRoute()

    const appointmentScheduleForDoctor = async (clinicBranches) => {
        try {
            const doctorId = route.params.id;
            const url = config.apiUrl + `/doctors/${doctorId}/schedule`

            const response = await authAxios.get(url, {
                params: {clinicBranches: JSON.stringify(clinicBranches)}
            })
            const data = formatAppointmentDate(response.data, true)

            emit('update:appointment-schedule', data)
        } catch (err) {
            store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
        }
    }

    const appointmentScheduleForClinic = async () => {
        try {
            const clinicBranchId = route.query.branch
            const url = config.apiUrl + `/clinic-branches/${clinicBranchId}/doctors-schedule`

            const response = await authAxios.get(url)
            const data = response.data

            const doctorsForAppointments = data.map((doctor) => ({
                doctorId: doctor.doctorId,
                fullName: doctor.firstName + ' ' + doctor.lastName
            }))
            emit('update:doctors-for-appointments', doctorsForAppointments)

            const appointmentSchedule = formatAppointmentDate(data)
            emit('update:appointment-schedule', appointmentSchedule)
        } catch (err) {
            store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
        }
    }

    return {
        appointmentScheduleForDoctor,
        appointmentScheduleForClinic
    }
}


function formatAppointmentDate(appointmentInfo, fromDoctorPage) {
    const appointmentSchedule = []

    for (const appointment of appointmentInfo) {
        const doctorSchedule = []

        for (const schedule of appointment.schedule) {
            const from = moment(schedule.from, 'HH:mm:ss')
            const to = moment(schedule.to, 'HH:mm:ss')
            const workingHours = [
                {time: from.format('HH:mm'), milliseconds: from.valueOf()},
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

        const entityKey = fromDoctorPage ? 'clinicBranchId' : 'doctorId'
        const entityValue = fromDoctorPage ? appointment.clinicBranchId : appointment.doctorId

        const newAppointment = {
            [entityKey]: entityValue,
            schedule: doctorSchedule
        }

        appointmentSchedule.push(newAppointment)
    }

    return appointmentSchedule
}

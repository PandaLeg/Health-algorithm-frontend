import {ref, toRef, watch} from "vue";
import {checkFromTime, checkToTime} from "./custom-validators.hook";
import cloneDeep from "lodash/cloneDeep";

export function updateLocationVuelidate(scheduleVuelidate, props, emit) {
    watch(scheduleVuelidate, (value) => {
        if (scheduleVuelidate.value.length > 1) {
            const locationVuelidate = props.locationVuelidate
            locationVuelidate.splice(props.indexLocation - 1, 1, ref(value))
            emit('update:location-vuelidate', [...locationVuelidate])
        }
    })
}

export function updateScheduleVuelidate(props, emit, isDoctorSchedule = false) {
    const scheduleRule = toRef(props, 'scheduleRule')

    watch(scheduleRule, () => {
        const scheduleVuelidate = props.scheduleVuelidate
        const indexSchedule = isDoctorSchedule ? props.indexSchedule - 1 : props.indexSchedule
        scheduleVuelidate.splice(indexSchedule, 1, props.v)

        emit('update:schedule-vuelidate', [...scheduleVuelidate])
    }, {deep: true})
}

export function watchAndUpdateScheduleRule(modelWeekDay, props, clinicSchedule, emit) {
    watch(modelWeekDay, (weekDayId) => {
        const currentBranch = props.clinicBranches.find(branch => branch.id === props.addressBranchId)

        const schedule = currentBranch.schedule.find(sh => sh.weekDayId === weekDayId)

        props.scheduleRule.from.minValue = {
            $validator: checkFromTime.bind(null, schedule.from, schedule.to),
            $message: 'Incorrect time',
            $params: {
                type: 'minValue'
            }
        }

        props.scheduleRule.to.minValue = {
            $validator: checkToTime.bind(null, schedule.from, schedule.to),
            $message: 'Incorrect time',
            $params: {
                type: 'minValue'
            }
        }

        clinicSchedule.value = schedule

        emit('update:schedule-rule', {...props.scheduleRule})
    })
}

export function watchAndUpdateDays(modelAddress, props, emit) {
    watch(modelAddress, (addressId) => {
        const currentBranch = props.clinicBranches.find(branch => branch.id === addressId)

        const days = cloneDeep(currentBranch.days)

        const schedule = props.schedule.map(sh => ({...sh, weekDay: null}))

        emit('update:schedule', schedule)
        emit('update:days', days)
    })
}

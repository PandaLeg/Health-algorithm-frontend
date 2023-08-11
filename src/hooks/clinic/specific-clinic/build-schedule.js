export default function (schedule) {
    const newSchedule = schedule.map(el => {
        let weekDay

        if (el.weekDays.length > 1) {
            weekDay = el.weekDays[0] + '-' + el.weekDays[el.weekDays.length - 1]
        } else {
            weekDay = el.weekDays[0]
        }

        const resultSchedule = el.dayType === 'Workday' ? weekDay + ': ' + el.time : weekDay + ': ' + el.dayType


        return {
            id: el.weekDayId,
            addressInfo: resultSchedule
        }
    })

    return newSchedule
}

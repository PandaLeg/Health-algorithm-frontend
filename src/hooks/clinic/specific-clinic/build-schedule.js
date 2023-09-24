export default function (schedule) {
    const newSchedule = schedule.map(el => {
        let weekDay = ''
        const weekDays = el.weekDays

        if (weekDays.length > 1) {

            for (let i = 0; i < weekDays.length; i++) {
                const currentDay = weekDays[i]
                let currentDayIndex = weekDays[i].id
                const nextDayIndex = weekDays[i + 1]?.id === 0 ? 7 : weekDays[i + 1]?.id

                const isConsecutive = ++currentDayIndex === nextDayIndex

                if (isConsecutive && weekDays.length - 1 !== i) {
                    weekDay += weekDay.indexOf(', ') === -1 ? currentDay.name + '-' : currentDay.name + ', '
                } else if (!isConsecutive && weekDays.length - 1 !== i) {
                    weekDay = weekDay.replaceAll('-', ', ') + currentDay.name + ', '
                } else {
                    weekDay += currentDay.name
                }
            }

            const isEachDayConsecutive = weekDay.indexOf('-') !== -1

            if (isEachDayConsecutive) {
                const newWeekDays = weekDay.split('-')
                weekDay = newWeekDays[0] + '-' + newWeekDays[newWeekDays.length - 1]
            }
        } else {
            weekDay = el.weekDays[0]
        }

        const resultSchedule = el.dayType === 'Workday' ? weekDay + ': ' + el.time : weekDay + ': ' + el.dayType


        return {
            id: el.weekDayId,
            date: resultSchedule
        }
    })

    return newSchedule
}

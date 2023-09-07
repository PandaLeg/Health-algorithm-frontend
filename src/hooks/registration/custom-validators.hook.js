export function checkRequiredValue(value, siblingState) {
    if (typeof value === 'string') {
        value = value.trim();
    }

    return siblingState.dayType === 'Workday' ? value !== undefined && value !== null && !!String(value).length : true
}

function parseTime(t) {
    const date = new Date()
    const time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/)
    date.setHours(parseInt(time[1]) + (time[3] ? 12 : 0))
    date.setMinutes(parseInt(time[2]) || 0)

    return date
}

function areTimesOutOfRange(from, fromScheduleTime, to, toScheduleTime) {
    return from >= parseTime(fromScheduleTime) && to <= parseTime(toScheduleTime)
}
export function checkFromTime() {
    const [fromScheduleTime, toScheduleTime, value, siblingState] = arguments
    const from = parseTime(value)
    const to = parseTime(siblingState.to)

    return from < to && areTimesOutOfRange(from, fromScheduleTime, to, toScheduleTime)
}

export function checkToTime() {
    const [fromScheduleTime, toScheduleTime, value, siblingState] = arguments
    const from = parseTime(siblingState.from)
    const to = parseTime(value)

    return to > from && areTimesOutOfRange(from, fromScheduleTime, to, toScheduleTime)
}

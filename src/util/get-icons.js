export function getClinicConvenienceIcons (convenienceId) {
    const icons = new Map()

    icons.set(1, '_icon-wifi')
    icons.set(2, '_icon-children')
    icons.set(3, '_icon-credit-card')
    icons.set(4, '_icon-square-parking')

    return icons.get(convenienceId)
}

export function getAppointmentIcons (iconId) {
    const icons = new Map()

    icons.set(1, '_icon-hospital-user')
    icons.set(2, '_icon-doctor')
    icons.set(3, '_icon-clinic')

    return icons.get(iconId)
}

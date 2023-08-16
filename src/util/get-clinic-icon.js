const clinicIcons = new Map()

clinicIcons.set(1, '_icon-wifi')
clinicIcons.set(2, '_icon-children')
clinicIcons.set(3, '_icon-credit-card')
clinicIcons.set(4, '_icon-square-parking')

export default function (convenienceId) {
    return clinicIcons.get(convenienceId)
}

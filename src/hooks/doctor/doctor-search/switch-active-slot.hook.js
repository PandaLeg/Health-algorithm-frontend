import {onMounted} from "vue";

export default function () {
    onMounted(() => {
        const slots = document.querySelectorAll('.slots-days__item')

        const setInitSlotActive = (slots) => {
            const firstSlot = slots[0]
            firstSlot.target.classList.add('slot-active')
        }

        const observer = new IntersectionObserver((slots) => {
            setInitSlotActive(slots)
            slots.forEach(slot => {
                slot.target.addEventListener('click', () => {
                    slots.forEach(slot => {
                        slot.target.classList.remove('slot-active')
                    })

                    slot.target.classList.add('slot-active')
                })
            })
        })

        for (const slot of slots) {
            observer.observe(slot)
        }
    })
}

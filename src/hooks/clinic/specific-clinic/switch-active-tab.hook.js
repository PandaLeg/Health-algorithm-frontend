import {onMounted} from "vue";

export default function () {
    onMounted(() => {
        const tabs = document.querySelectorAll('.clinic-tabs__switch-btn')
        const allContent = document.querySelectorAll('.tabs-content__wrapper')

        const observer = new IntersectionObserver((tabs) => {
            tabs.forEach((tab, index) => {
                tab.target.addEventListener('click', (event) => {
                    tabs.forEach(tab => tab.target.classList.remove('tab-active'))
                    tab.target.classList.add('tab-active')

                    const activeLine = document.querySelector('.clinic-tabs__active-line')

                    activeLine.style.width = event.target.offsetWidth + 'px'
                    activeLine.style.left = event.target.offsetLeft + 'px'

                    allContent.forEach(content => content.classList.remove('content-active'))
                    allContent[index].classList.add('content-active')
                })
            })
        });

        for (const tab of tabs) {
            observer.observe(tab)
        }
    })
}

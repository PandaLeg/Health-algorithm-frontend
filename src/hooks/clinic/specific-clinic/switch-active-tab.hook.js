import {onMounted} from "vue";

export default function () {
    onMounted(() => {
        const tabs = document.querySelectorAll('.clinic-tabs__switch-btn')
        const allContent = document.querySelectorAll('.tabs-content__wrapper')

        const getBtnLineFromTabActive = (tab) => tab.target.childNodes[1].firstChild

        const observer = new IntersectionObserver((tabs) => {
            let btnLine = getBtnLineFromTabActive(tabs[0])
            btnLine.style.opacity = 1

            tabs.forEach((tab, index) => {
                tab.target.addEventListener('click', (event) => {

                    tabs.forEach(tab => {
                        btnLine = getBtnLineFromTabActive(tab)
                        btnLine.style.opacity = 0
                        tab.target.classList.remove('tab-active')
                    })
                    tab.target.classList.add('tab-active')

                    const activeLine = document.querySelector('.clinic-tabs__active-line')
                    btnLine = event.target.childNodes[0]

                    activeLine.style.opacity = 1
                    activeLine.style.width = event.target.offsetParent.offsetWidth + 'px'
                    activeLine.style.left = event.target.offsetParent.offsetLeft + 'px'

                    setTimeout(() => {
                        btnLine.style.opacity = 1
                        activeLine.style.opacity = 0
                    }, 500)
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

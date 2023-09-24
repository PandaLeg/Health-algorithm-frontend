export default function () {

    const switchActiveTab = () => {
        const tabs = document.querySelectorAll('.clinic-tabs__switch-btn')
        const allContent = document.querySelectorAll('.tabs-content__wrapper')
        let btnLine

        const getBtnLineFromTabActive = (tab) => tab.target.childNodes[1].firstChild
        const resetTabs = (tabs) => {
            tabs.forEach(tab => {
                btnLine = getBtnLineFromTabActive(tab)
                btnLine.style.opacity = 0
                tab.target.classList.remove('tab-active')
            })
        }
        const resetContent = () => {
            allContent.forEach(content => content.classList.remove('content-active'))
            allContent[0].classList.add('content-active')
        }
        const setInitTabActive = (tabs) => {
            const firstTab = tabs[0]
            firstTab.target.classList.add('tab-active')

            btnLine = getBtnLineFromTabActive(firstTab)
            btnLine.style.opacity = 1
        }

        const observer = new IntersectionObserver((tabs) => {
            resetTabs(tabs)
            resetContent()
            setInitTabActive(tabs)

            tabs.forEach((tab, index) => {
                tab.target.addEventListener('click', (event) => {
                    resetTabs(tabs)
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
    }

    return {
        switchActiveTab
    }
}

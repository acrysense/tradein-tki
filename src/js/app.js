document.addEventListener("DOMContentLoaded", function () {
    /**
     * NodeList.prototype.forEach() polyfill
     * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
     */
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }

    // TABS
    const tabsItems = document.querySelectorAll('.tabs__item')
    
    if (tabsItems) {
        tabsItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.tabs__item').forEach((child) => child.classList.remove('tabs__item--active'))
                document.querySelectorAll('.tabs__content').forEach((child) => child.classList.remove('tabs__content--active'))
    
                item.classList.add('tabs__item--active')
                document.querySelectorAll('.tabs__content')[i].classList.add('tabs__content--active')
            })
        })
    }

    // INPUT LENGHT
    const customCheckbox = document.querySelectorAll('.custom-checkbox')

    const inputImei = document.getElementById('imei') // Input IMEI
    const inputSerialNumber = document.getElementById('serial-number') // Input Serial Number
    const continueBtn = document.querySelector('.trade-in__cta') // Continue button
    let imeiCharacters = document.getElementById('imei-characters') // IMEI Characters
    let serialNumberCharacters = document.getElementById('serial-number-characters') // Serial Number Characters

    if (inputImei) {
        imeiCharacters.innerHTML = 0 // Initial value

        inputImei.addEventListener('input', () => {
            if (inputImei.value.length === 15) {
                continueBtn.removeAttribute('disabled')
                continueBtn.classList.add('trade-in__cta--active')
            } else {
                continueBtn.setAttribute('disabled', 'disabled')
                continueBtn.classList.remove('trade-in__cta--active')
            }
    
            imeiCharacters.innerHTML = inputImei.value.length
        })
    }

    if (serialNumberCharacters) {
        serialNumberCharacters.innerHTML = 0 // Initial value
        
        inputSerialNumber.addEventListener('input', () => {
            if (inputSerialNumber.value.length === 11 || inputSerialNumber.value.length === 12) {
                continueBtn.removeAttribute('disabled')
                continueBtn.classList.add('trade-in__cta--active')
            } else {
                continueBtn.setAttribute('disabled', 'disabled')
                continueBtn.classList.remove('trade-in__cta--active')
            }
    
            serialNumberCharacters.innerHTML = inputSerialNumber.value.length
        })
    }
    
    if (customCheckbox) {
        customCheckbox.forEach((item) => {
            item.addEventListener('change', () => {
                inputSerialNumber.parentNode.classList.remove('counter-input--hidden')
            })
        })
    }

    // MOBILE MENU
    const hamburger = document.getElementById('hamburger-toggle')
    const overlay = document.getElementsByClassName('overlay')[0]

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (hamburger.classList.contains('hamburger--active') && overlay.classList.contains('overlay--open')) {
                hamburger.classList.remove("hamburger--active");
                overlay.classList.remove("overlay--open");
                document.body.classList.remove("scroll-disabled");
            } else {
                hamburger.classList.add("hamburger--active");
                overlay.classList.add("overlay--open");
                document.body.classList.add("scroll-disabled");
            }
        });
    }

    // STAGE (TEMP)
    const stageEnd = document.getElementById('stage-end')
    const stageContinue = document.getElementById('stage-continue')
    const stageBack = document.getElementById('stage-back')
    const maxStage = 5 // Max stage (start 0)
    let tradeInInner = document.querySelectorAll('.trade-in__inner')
    let stage = 0 // Initial stage

    if (tradeInInner) {
        stageContinue.addEventListener('click', () => {
            if (maxStage > stage) {
                tradeInInner.forEach((child) => child.classList.remove('trade-in__inner--active'))
                stage++
                tradeInInner[stage].classList.add('trade-in__inner--active')
            }
            
            if (stage === 1) {
                stageBack.style.display = 'block'
            } else {
                stageBack.style.display = 'none'
            }

            if (stage === maxStage) {
                stageEnd.innerHTML = 'Завершить'
                stageContinue.innerHTML = 'Распечатать договор'
            }
        })
    }
});
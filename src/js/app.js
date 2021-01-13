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
    const inputImei = document.getElementById('imei')
    const inputSerialNumber = document.getElementById('serial-number')
    const continueBtn = document.querySelector('.trade-in__continue')
    let imeiCharacters = document.getElementById('imei-characters')
    let serialNumberCharacters = document.getElementById('serial-number-characters')

    imeiCharacters.innerHTML = 0
    serialNumberCharacters.innerHTML = 0

    inputImei.addEventListener('input', () => {
        if (inputImei.value.length === 15) {
            continueBtn.removeAttribute('disabled')
            continueBtn.classList.add('trade-in__continue--active')
        } else {
            continueBtn.setAttribute('disabled', 'disabled')
            continueBtn.classList.remove('trade-in__continue--active')
        }

        imeiCharacters.innerHTML = inputImei.value.length
    })

    inputSerialNumber.addEventListener('input', () => {
        if (inputSerialNumber.value.length === 11 || inputSerialNumber.value.length === 12) {
            continueBtn.removeAttribute('disabled')
            continueBtn.classList.add('trade-in__continue--active')
        } else {
            continueBtn.setAttribute('disabled', 'disabled')
            continueBtn.classList.remove('trade-in__continue--active')
        }

        serialNumberCharacters.innerHTML = inputSerialNumber.value.length
    })
});
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc(){
    //Calc

    const result = document.querySelector('.calculating__result span');
    let gender, height, weight, age, ratio;

    if(localStorage.getItem('gender')){
        gender = localStorage.getItem('gender');
    }else {
        gender = 'female';
        localStorage.setItem('gender', 'female')
    }

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    }else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375)
    }

    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem =>{
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('gender')){
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
               elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active');
    
    function calcTotal(){
        if(!gender || !height || !weight || !age || !ratio){
            result.textContent='???';
            return;
        }
        if(gender === 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else{
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem =>{
            elem.addEventListener('click', (e) =>{

                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    gender = e.target.getAttribute('id');
                    localStorage.setItem('gender', e.target.getAttribute('id'));
                }
    
                console.log(ratio, gender);
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal()
            });
        });

    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)){
               input.style.border = '2px solid red'; 
            }else{
                input.style.border = 'none';  
            }
            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });

    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards(){
 //ClassTab
    // Создание класса 
    class TabContent{
        // В конструктор помещаются аргументы (конструктор вляется встроенным методом класса);
        // В конце используется оператор rest, который позволяет записать неограниченное число аргументов в массив classes.
        constructor(img, alt, title, descr, price, parentSelector, ...classes){
            // Значения аргументов присваиваются пременным с оператором контекста вызова this.
            // Это позволит создавать новые независимые друг от друга экземпляры этих переменных; 
            this.alt = alt;
            this.img = img;
            this.descr = descr;
            this.price = price;
            this.title = title;
            this.parent = document.querySelector(parentSelector);
            this.transf = 27;
            this.classes = classes;
        }
        
        // Инициализация метода класса; 
        changeToUAH(){
            this.price = this.price * this.transf;
        }
        // Встроенный классовый метод render() позволяет поместить на страницу вестку; 
        render(){
            const element = document.createElement('div'); // Создание нового элемента div
            if(this.classes.length === 0){                 // Проверка classes, если в массив classes не записано ничего, 
                this.element = 'menu__item';               // то класс по умолчанию вводит нужное значение (menu__item),
                element.classList.add(this.element);       // в класс лист нового элемента добавляется значение 'menu__item';
            } else{
                this.classes.forEach(className => element.classList.add(className)); // Иначе добавляется то имя которое было введено пользователем;
            }
            
            element.innerHTML = `
            <img src=${this.img} alt=${this.alt}>
            <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;

            this.parent.append(element); // Добавление созданного div элемента в конец родительского контейнера
    }
}    

const getResource = async (url) => {
    const res = await fetch(url);
    
    if(!res.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
 };

//  getResource('http://localhost:3000/menu')
//     .then(data =>{
//         data.forEach(({img, altimg,title, descr, price}) => {
//             console.log(img, altimg,title, descr, price);
//             new TabContent(img, altimg, title, descr, price, '.menu .container').render();
//         });
//     });

    axios.get('http://localhost:3000/menu')
        .then(data =>{
            data.data.forEach(({img, altimg,title, descr, price}) => {
            new TabContent(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

    // Вызов метода render через вызов класса TabContent;
    //  new TabContent(
    //      "img/tabs/vegy.jpg",
    //      "vegy",
    //      "Фитнес",
    //      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //       9,
    //      '.menu .container',
    //      'menu__item',
    //      'big'
    //  ).render();

}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms (){
     //Forms

     const forms = document.querySelectorAll('form');

     const message ={
         loading:'img/spinner.svg',
         success: 'Спасибо, скоро мы с вами свяжемся',
         failure: 'Что-то пошло не так...'
     }

     forms.forEach(item => {
         bindPostData(item);
     });




     function bindPostData(form){
         form.addEventListener('submit', (e) =>{
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            form.append(statusMessage);

            const formData = new FormData(form);
            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
             });

             const postData = async (url, data) => {
                let res = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: data
                });
        
                return await res.json();
             };


            // fetch('server.php', {
            //      method: "POST",
            //      headers: {
            //          'Content-type': 'aplication/json'
            //      },
            //     body: JSON.stringify(object)
            // })

           const json =  JSON.stringify(Object.fromEntries(formData.entries()))
             

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() =>{
                form.reset();
            });

            // const request = new XMLHttpRequest();

            // request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'application/json');
            // const formData = new FormData(form);

            // const object = {};
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });

            // const json = JSON.stringify(object);

            // request.send(json);

            // request.addEventListener('load', () =>{
            //     if(request.status === 200){
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         statusMessage.textContent = message.success;
            //         form.reset();
            //         statusMessage.remove();
            //     } else{

            //         showThanksModal(message.failure);
            //     }
            // });
         });
     }
     function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
      
        modalOpen();

        const thanksModal = document.createElement('div');

        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            modalClose();
        }, 5000);
     }

    //  fetch('http://localhost:3000/menu')
    //  .then(data => data.json())
    //  .then(res => console.log(res));
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal(){
        //Modal Window

    // Получение элементов DOM-дерева по внутренним аргументам элементов и по классу;
    const dataModals = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');

    // Функция modalOpen() добавляет класс show и убирает класс hide для элемента с классом modal и глобально убирает скролл со страницы; 
    const modalOpen = () =>{
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    // Функция modalClose() добавляет класс hide и убирает класс show для элемента с классом modal и глобально возвращает скролл на страницу;
    const modalClose = () =>{
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    // Для каждо кнопки вызова модального окна добавляется обработчик событий
    dataModals.forEach(dataModal => {
        dataModal.addEventListener('click', modalOpen);
    })
    // Закрывает модальное окно если была нажата кнопка закрыть и  прокликана свободная область вокруг окна но не внутри;
        modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            modalClose();
        }
    });

    // Закрывает модальное окно при клике на клавишу Esc;
    document.addEventListener('keydown', (e) =>{
        if(e.code === 'Escape' && modal.classList.contains('show')){
            modalClose();
        }
    });

    const modalTimerId = setTimeout(modalOpen, 30000);

    const showModalByScroll = () =>{
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            modalOpen();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll)
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider(){
    //Slider

    const slides = document.querySelectorAll('.offer__slide');
    const slider = document.querySelector('.offer__slider');
    const prev = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    const total = document.querySelector('#total');
    const current = document.querySelector('#current');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;


    if (slides.length < 10){
         total.textContent = `0${slides.length}`;
         current.textContent = `0${slideIndex}`;
    } else {
         total.textContent = slides.length;
         current.textContent = slideIndex;
    }
     


    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
            dots = [];
    indicators.classList.add('carusel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;

        if(i == 0){
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {

        if (offset == +width.replace(/\D/g, '')  * (slides.length - 1)){ //'500px'
            offset = 0;
        } else{
            offset += +width.replace(/\D/g, '') ;
        }


        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length){
            slideIndex = 1;
        } else{
            slideIndex++;
        } 

        if (slides.length < 10){
           current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        } 

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if ( offset == 0 ){
            offset = +width.replace(/\D/g, '') * (slides.length - 1);
        } else{
            offset -= +width.replace(/\D/g, '');
        }


        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1){
            slideIndex = slides.length;
        } else{
            slideIndex--;
        } 

        if (slides.length < 10){
           current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        } 

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) =>{
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = +width.replace(/\D/g, '')  * (slideTo - 1);


            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10){
                current.textContent = `0${slideIndex}`;
             } else {
                 current.textContent = slideIndex;
             } 

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;

        });
    })
}

module.exports = slider;

//     showSlides(slideIndex);

//     if(slides.length < 10){
//         total.textContent = `0${slides.length}`
//     } else{
//         total.textContent = slides.length;
//     }


//     function showSlides(n){
//         if(n > slides.length){
//             slideIndex = 1;
//         }
//         if(n < 1){
//             slideIndex = slides.length;
//         }

//         slides.forEach(item => item.style.display = 'none');

//         slides[slideIndex - 1].style.display = 'block';

//         if(slides.length < 10){
//             current.textContent = `0${slideIndex}`;
//         } else {
//             current.textContent = slideIndex;
//         }
//     }

//     function plusSlides(n){
//         showSlides(slideIndex += n);
//     }

//     prev.addEventListener('click', () =>{
//         plusSlides(-1);
//     })

//     next.addEventListener('click', () =>{
//         plusSlides(1);
//     })

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs(){
        //Tabs

    // Получение селектором для манипуляций;
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    // Функция hideTabContent() добавляет для каждого элемента с классом tabсontent, стиль 
    // hide и удаляет show, fade;
    const hideTabContent = () =>{
        tabsContent.forEach(item =>{
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
    // При этом для элементов DOM-дерева c классом tabheader__item удаляет доп. класс tabheader__item_active
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    // Функция showTabContent() принимает аргумент i со значением 0, где i это номер элемента массива
    // она добавляет классы css show и fade и убирает hide, делает активным tabheader_item_active для элемента с номером i
    const showTabContent = ( i = 0 ) => {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    //Вызов функций
    hideTabContent();
    showTabContent();

    // Обработчик событий установлен на элементах с классом .tabheader__items и если соответствующий итем
    // содержит класс tabheader__item  для каждого элемента с классом tabheader__item происходит пересчет
    // и вызов фукций hideTabContent и showTabContent с соответствующим аргументом i если элемент равен целевому; 
    tabsParent.addEventListener('click', (e) =>{
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((tab, i) => {
                if(target == tab){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer(){
    //Timer

    //Устанавливаем дедлайн;
    const deadline = '2021-09-30';

    //Функция получает параметром конечное время, рассчитывает оставшееся время в формате дни/часы/минуты/секунды
    //Возвращает полученные значения дней, часов, минут, секунд наружу; 
    function getTimeRemaining(endTime){
        //Рассчитываем оставшееся время путем отнятия конечного от текущего;
        // Метод даты Date.parse() - позволяет преобразовать строку с датой и временем в значение даты и времени для математических вычислений;
        // new Date() - позволяет получить строку с текущей датой и временем; 
        const t = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t/( 1000 * 60 * 60 ) % 24)),
              minutes = Math.floor((t/1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    //Функция getZero() принимает аргумент num, после чего следуя алгоритму добавляет к однозначному числу впереди 0 
    // и возвращает полученное значение; 
    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`
        }else{
            return num;
        }
    }

    // Функция setClock() принимает аргументы selector и endTime, эта функция служит для получения необходимых элементов с HTML-страницы,
    // внутри себя функция вызывает внутреннюю функцию updateClock(), также функция updateClock() предается как аргумент в setInterval()
    // который присваивается переменной timeInterval;   
    function setClock(selector, endTime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

              updateClock();
     
    // Функция updateClock() преобразует значения внутри HTML-селекторов в значения полученные в функции getTimeRemaining().
    // Так же если разница между текущим временем и конечным равна 0, то функция прекращает обратный отсчет, сбрасывает интервал;         
        function updateClock(){
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML =getZero(t.seconds);

            if(t.total <=  0){
                clearInterval(timeInterval);
            }
        }
    }

    // Вызов функции setClock();
    setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
// При загрузке страницы выполняется следующее:

window.addEventListener('DOMContentLoaded', () => {

    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
    const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
    const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
    const cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
    const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
    const forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
    const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();
});



// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method:"POST",
//     body: JSON.stringify({name:'Alex'}),
//     headers: {
//         'Content-type': 'application/json'
//     }
// })
//     .then(response => response.json())
//     .then(json => console.log(json))




//     showSlides(slideIndex);

//     if(slides.length < 10){
//         total.textContent = `0${slides.length}`
//     } else{
//         total.textContent = slides.length;
//     }


//     function showSlides(n){
//         if(n > slides.length){
//             slideIndex = 1;
//         }
//         if(n < 1){
//             slideIndex = slides.length;
//         }

//         slides.forEach(item => item.style.display = 'none');

//         slides[slideIndex - 1].style.display = 'block';

//         if(slides.length < 10){
//             current.textContent = `0${slideIndex}`;
//         } else {
//             current.textContent = slideIndex;
//         }
//     }

//     function plusSlides(n){
//         showSlides(slideIndex += n);
//     }

//     prev.addEventListener('click', () =>{
//         plusSlides(-1);
//     })

//     next.addEventListener('click', () =>{
//         plusSlides(1);
//     })


//documents/Учебка/NativJS2/Practice/Food  - поиск директории проекта
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
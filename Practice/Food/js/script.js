import tabs from './modules/tabs'; //Подключение кода с табами;
import modal from './modules/modal'; //Подключение модального окна;
import timer from './modules/timer'; //Подключение таймера;
import cards from './modules/cards'; //Подключение карт с блюдами;
import calc from './modules/calc'; //Подключение калькулятора;
import forms from './modules/forms';//Подключение форм;
import slider from './modules/slider';//Подключение слайдера;
import {modalOpen} from './modules/modal';//Подключение механизма открытия модального окна;

//При событии загрузка контетнта страницы происходит следующее:
window.addEventListener('DOMContentLoaded', () => {

    //Переменной modalTimerId присваивается значение setTimeout в котором
    //по истечению 30 секунд выполняется функция открывающая модальное окно;
    const modalTimerId = setTimeout(() => modalOpen('.modal', modalTimerId), 30000);
  
    //Вызывается функция табов и принимает в себя строковые параметры с названиями селекторов; 
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');

    //Вызывается функция модального окна и принимает в себя строковые параметры с названиями селекторов;
    modal('[data-modal]', '.modal', modalTimerId);

    //Вызывается функция таймер и принимает в себя строковые параметры с названиями селекторов;
    timer('.timer', '2022-09-30');

    //Вызывается функция с карточек блюд;
    cards();

    //Вызывается функция калькулятор;
    calc();

    //Вызывается функция обработки формы;
    forms('form', modalTimerId);

    //Вызывается функция слайдер в слайдер передается объект из аргументов
    //т.к. благодаря этому приему совершенно не имеет значения в каком порядке заданы
    // параметры для данного слайдера
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        slide: '.offer__slide',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });

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
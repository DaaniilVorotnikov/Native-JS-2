'use strict';

// Получение элементов с классами box и button;
const box = document.querySelector('.box');
const btn = document.querySelector('button');

// Получение ширины и высоты скролла внутри элемента с классом box;
const width = box.scrollWidth;
const height = box.scrollHeight;

console.log(width, height);


// Обработчик события при клике происходит рассчет насколько страница проскроллена и выводится на экран(активно);
// При клике на обработчик высота элемента увеличивается до высоты скролла, в консоль выводится высота проскролленого(в комментариях);
btn.addEventListener('click', () =>{
    //box.style.height = box.scrollHeight + 'px';
//    console.log(box.scrollTop);
console.log(document.documentElement.scrollTop);
});

//getBoundingClientRect() возвращает размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим) от высоты.
console.log(box.getBoundingClientRect().top);

// Присвоение переменной style всех значений css класса box;
const style = window.getComputedStyle(box);

// Вывод значения css-свойства display;
console.log(style.display);

// Прокручивает документ НА указанные величины;
window.scrollBy(0, 400);

// Прокрутка документа ДО указанных координат;
window.scrollTo(0, 400);
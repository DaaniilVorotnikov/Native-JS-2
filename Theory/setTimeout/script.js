//Назначение переменных let;
let timerId,
    i = 0;

// Получение кнопки и запись в переменную btn;    
const btn = document.querySelector('.btn');

//Функция animation() создает примитивную анимацию движения элемента с классом box внутри родительского контейнера;
const animation = () =>{
    // Получение элемента с классом box в переменную elem; 
    const elem = document.querySelector('.box');
    // Назначение переменной позиции;
    let pos = 0;

    // Внутренняя функция frame() меняет позицию элемента через стили top и left, если значение pos равняется 300 интервал очищается;
   const frame = () => {
        if(pos == 300){
            clearInterval();
        }else{
           pos++;
           elem.style.top = pos + "px"; 
           elem.style.left = pos + "px"; 
        }
    }

    // Функция вызывает в инетравле равном 10 милисекунд
    const id = setInterval(frame, 10);
}

// Устанавливает обработчик события на кнопку
btn.addEventListener('click', animation);

/*

// Функция logger выводит значение переменной text, если i достигает значения 3, то интервал очищается;
const logger = (text = 'Hello') =>{
    if (i === 3){
        clearInterval(timerId);
    }

    console.log(text);
    i++;
}

// Устанавливает таймаут при каждом выполнении функции в 5 секунд
const timerId = setTimeout(logger, 5000);

// Устанавливает интервал каждого выполнения функции в 5 секунд
timerId = setInterval(logger, 5000);

// Итого функция logger выполняется раз в 10 секунд;

// Осуществление схожего с предыдущим примером функционала через рекурсию
let id = setTimeout(function log(){
    console.log('Hello');
    id = setTimeout(log, 500)
}, 500)
*/
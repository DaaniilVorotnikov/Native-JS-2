

// Получение кнопки и запись в переменную btn;    
const btn = document.querySelector('.btn');
// Получение эемента который нужно будет передвинуть;
const elem = document.querySelector('.box');

//Переменная pos содержит значение текущей позиции элемента внутри контейнера
let pos = 0;

//Функция myAnimation() осуществляет анимацию
function myAnimation(){
    // Инкремент переменной pos срабатывает при каждом вызове функции;
    pos++;
    elem.style.top = pos + "px"; //Значению стиля позиции сверху присваивается значение равное переменной pos + px;
    elem.style.left = pos + "px"; //Значению стиля позиции слева присваивается значение равное переменной pos + px;
        //Если переменная pos меньше 300 requestAnimationFrame вызывает функцию myAnimation;
        if (pos < 300){
            requestAnimationFrame(myAnimation);
        } 
    }
//При нажатии на кнопку происходит первый вызов функции requestAnimationFrame, которая проигрывает анимацию
btn.addEventListener('click', () => requestAnimationFrame(myAnimation));

//Переменной id присваивается requestAnimationFrame(myAnimation);
let id = requestAnimationFrame(myAnimation);

//Метод cancelAnimationFrame очищает выполнение анимации;
cancelAnimationFrame(id);
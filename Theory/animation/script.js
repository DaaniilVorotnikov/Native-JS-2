

// Получение кнопки и запись в переменную btn;    
const btn = document.querySelector('.btn');
const elem = document.querySelector('.box');
let pos = 0;

function myAnimation(){

    pos++;
    elem.style.top = pos + "px";
    elem.style.left = pos + "px";

        if (pos < 300){
            requestAnimationFrame(myAnimation);
        } 
    }
btn.addEventListener('click', () => requestAnimationFrame(myAnimation));

let id = requestAnimationFrame(myAnimation);

cancelAnimationFrame(id);
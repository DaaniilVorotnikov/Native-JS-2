'use strict';
//Присваивание переменной значение найденного по id селектора с вводом рублей;
const inputRub = document.querySelector('#rub');
//Присваивание переменной значение найденного по id селектора с вводом долларов;
const inputUsd = document.querySelector('#usd');

//На полученный элемент вешается обработчик событий на ввод;
inputRub.addEventListener('input', () =>{

    //Переменной request(запрос) присвивается новый экземпляр XMLHttpRequest запроса;
    const request = new XMLHttpRequest();

    //С помощью встроенного метода open (встроенного в XMLHttpRequest), задаем настройки 
    //для запроса (тип запроса и тип данных). Полный список параметров - open(method, url, async, user, password); 
    request.open('GET', 'js/current.json');
    //С помощью метода setRequestHeader происходит определение имени запроса и значения передаваемых в виде строк;
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    // Отправка запроса;
    request.send();

    // Обработчик события срабатывает при событии загрузка;
    request.addEventListener('load', () => {
        // Если статус запроса равен 200 (все ок) то выполняется условие;
        if(request.status === 200){
            //Вывести в консоль свойство response(ответ);
            console.log(request.response);
            //Перевод ответа в обратно в объект и присвоение его значения переменной data;
            const data = JSON.parse(request.response);
            //Полученное значение в рублях делим на значение полученное из ответа от сервера
            //округляем все до 2х символов после запятой и присваеваем значению инпута в долларах;
            inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
        } else{
            //Иначе выводим строку ошибка;
            inputUsd.value = 'Error';
        }
    });

    // status
    // statusText
    // response
    // readyState


});
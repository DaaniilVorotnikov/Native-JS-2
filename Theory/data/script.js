'use strict';

// Получение текущей даты в виде строки; 
const now = new Date();

// Преобразование строки с датой в исчисляемое значение
Date.parse('2020-05-01');

// Установка текущего часа второй аргумент отвечает за минуты
console.log(now.setHours(18, 40));
//console.log(now);

/*

// Получение текущего года;
console.log(now.getFullYear());

// Получение месяца;
console.log(now.getMonth());

// Получение получение даты
console.log(now.getDate());

// Получение дня
console.log(now.getDay());

// Получение часов
console.log(now.getHours());

// Получение часов в UTC
console.log(now.getUTCHours());

// Полчить текущую таймзону 
console.log(now.getTimezoneOffset());

// Получить текущее время
console.log(now.getTime());
*/

// Установить текущую дату
let start = new Date();
// Создать тестовый цикл
for(let i = 0; i < 100000; i++){
    let some = i ** 3;
}

// Назначить текущую дату теперь
let end = new Date();

// Отнять стартовую дату от конечной и вывести в alert
alert(`Цикл отработал за ${end - start} миллисекунд`)
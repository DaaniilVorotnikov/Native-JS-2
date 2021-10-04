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
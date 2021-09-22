// При загрузке страницы выполняется следующее:

window.addEventListener('DOMContentLoaded', () => {
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


    //Modal Window

    // Получение элементов DOM-дерева по внутренним аргументам элементов и по классу;
    const dataModals = document.querySelectorAll('[data-modal]');
    const dataClose = document.querySelector('[data-close]');
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
        dataClose.addEventListener('click', modalClose);
        modal.addEventListener('click', (e) => {
        if(e.target === modal){
            modalClose();
        }
    });

    // Закрывает модальное окно при клике на клавишу Esc;
    document.addEventListener('keydown', (e) =>{
        if(e.code === 'Escape' && modal.classList.contains('show')){
            modalClose();
        }
    });

    const modalTimerId = setTimeout(modalOpen, 3000);

    const showModalByScroll = () =>{
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            modalOpen();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll)

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

    // Вызов метода render через вызов класса TabContent;
     new TabContent(
         "img/tabs/vegy.jpg",
         "vegy",
         "Фитнес",
         'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
          9,
         '.menu .container',
         'menu__item',
         'big'
     ).render();
});
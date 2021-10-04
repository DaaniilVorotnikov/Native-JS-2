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
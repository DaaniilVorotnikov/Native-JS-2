'use strict';

//const num = new Number(3);
//console.log(num);

//Функция конструктор User принимает 2 аргумента name, id;
function User(name, id){
    //Контекст вызова this позволяет унифицировать свойства для каждого нового экземпляра;
    this.name = name;
    this.id = id;
    this.human = true;
    //Создание кастомного метода hello;
    this.hello = function (){
        console.log(`Hello ${this.name}`);
    }
}

//Помещение метода exit в функцию-конструктор User;
User.prototype.exit = function () {
    console.log(`Пользователь ${this.name} ушел`)
} 

//Создание новых экземпляров и присвоение их переменным;
const ivan = new User('Ivan', 28);
const alex = new User('Alex', 20);

//Вызов метода exit;
alex.exit();

//Вызов метода hello;
ivan.hello();


//Выводим Ванька и Леху в консоль;
console.log(ivan);
console.log(alex);

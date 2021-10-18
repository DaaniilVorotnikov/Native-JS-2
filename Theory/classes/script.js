'use strict';

//Инициализация класса Rectangle;
class Rectangle{

    //В метод конструктора принимаются аргументы;
    constructor(height, width){
        //Контекси вызова this по сути уникализирует каждое свойство класса,
        //это позволяет создавать новые экземпляры класса значения которых независят друг от друга.
        //Соответственно далее свойствам класса присваиваются значения аргументов конструктора;
        this.height = height;
        this.width = width;
    }
    //Кастомный метод класса Rectangle каждый раз при вызове будет перемножать уникальные 
    //для каждого нового экземпляра значения свойства;
    calcArea() {
        return this.height * this.width;
    }
}

//Класс ColoredRectangleWithText наследуется от класса Rectangle;
class ColoredRectangleWithText extends Rectangle{
    //Метод конструктор принимает аргументы
    constructor(height, width, text, backgroundColor){
        //Метод super внутри конструктора содержит два аргумента.
        //Данный метод осуществляет наследование свойств из класса родителя;
        super(height, width);
        //Также класс ColoredRectangleWithText имеет внутри себя собственные свойства;
        this.text = text;
        this.backgroundColor = backgroundColor;
    }
    //Кастомный метод класса ColoredRectangleWithText;
    showMyProps(){
        console.log(`Текст: ${this.text} , цвет ${this.backgroundColor}`)
    }
}

//Создание экземпляра класса ColoredRectangleWithText и присвоение его переменной div;
const div = new ColoredRectangleWithText(25, 32, 'Hello', 'red');

//Вызов кастомного метода класса ColoredRectangleWithText;
div.showMyProps();

//Вызов унаследованного кастомного метода класс ColoredRectangleWithText
//Вывод результата вызова в консоль;
console.log(div.calcArea())

// const square = new Rectangle(10, 10);
// const long = new Rectangle(200, 100);

// console.log(long.calcArea());
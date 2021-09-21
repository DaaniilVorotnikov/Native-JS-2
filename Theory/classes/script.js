'use strict';

class Rectangle{
    constructor(height, width){
        this.height = height;
        this.width = width;
    }

    calcArea() {
        return this.height * this.width;
    }
}

class ColoredRectangleWithText extends Rectangle{
    constructor(height, width, text, backgroundColor){
        super(height, width);
        this.text = text;
        this.backgroundColor = backgroundColor;
    }
    showMyProps(){
        console.log(`Текст: ${this.text} , цвет ${this.backgroundColor}`)
    }
}

const div = new ColoredRectangleWithText(25, 32, 'Hello', 'red');

// const square = new Rectangle(10, 10);
// const long = new Rectangle(200, 100);

// console.log(long.calcArea());
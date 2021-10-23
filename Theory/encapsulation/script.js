'use strict';

//Инициализируем класс;
class User{
  //В конструктор передаем аргументы с именем и возрастом;
    constructor(name, age){
    this.name = name; //Создание свойств;
    this._age = age;  //Условное обозначение _age условно позворлит соблюсти инкапсуляцию 
    }
    //Переменная вне конструктора;
    #surname = 'Vorotnikov'

    //Кастомный метод say;
    say = () => {
        console.log(`Имя пользователя: ${this.name} ${this.#surname}, возраст ${this._age}`);
    }

    get age(){
        return this._age;
    }

    set age(age){
      if(typeof age === 'number' && age > 0 && age < 110){
        this._age = age;
      }else{
          console.log('Недопустимое значение!');
      }  
    }
}

const ivan = new User('Ivan', 27);

// console.log(ivan.age);

// ivan.age = 99;

 console.log(ivan.surname);

// console.log(ivan.getAge());

// ivan.setAge(30);
// ivan.name = 'Alex';

ivan.say();
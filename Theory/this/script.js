'use strict';

// 1) Обычная функция: this = window, но если есть строка 'use strict' - undefined;
// 2) Контекст у методов объекта - сам объект;
// 3) this в конструкторах и классах - это новый экземпляр объекта;
// 4) Ручная привязка this: call, apply, bind;

//function showThis(a, b){
   // console.log(this);
  //  function sum(){
   //     console.log(this);
       // return a + b;
//}
    //console.log(sum());
//}

//showThis(4, 5);


//const obj = {
  //  a: 20,
  //  b: 15,
  //  sum: function() {
   //     function shout(){
   //     console.log(this)
   //     }
   //     shout()
   // }
//}

//obj.sum();

// function User(name, id){
//     this.name = name;
//     this.id = id;
//     this.human = true;
//     this.hello = function (){
//         console.log(`Hello ${this.name}`);
//     }
// }

// const ivan = new User('Ivan', 28);

    // function sayName(surname){
    //     console.log(this);
    //     console.log(this.name + surname);
    // }

    // const user = {
    //     name: 'John'
    // };

    // sayName.call(user, 'Smith');
    // sayName.apply(user, ['Mitchel']);

    // function count(num){
    //     return this * num;
    // }

    // const double = count.bind(2);

    // console.log(double(3));

    const btn = document.querySelector('button');
    
    // В обработчиках собития если мы создаем функцию через function мы можем использовать this.
    // В стрелочной функции контекст теряется, поэтому лучше всегда использовать e.target;
    btn.addEventListener('click', function(){
         console.log(this);
       this.style.backgroundColor = 'red';
     })

    // const obj = {
    //     num: 5,
    //     sayNumber: function(){
    //         const say = () =>{
    //             console.log(this.num);
    //         };
    //         say();
    //     }
    // }

    // obj.sayNumber();

    // const double = a => a * 2;
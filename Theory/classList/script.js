// Получение элементов DOM-дерева и заключение их в переменнные

const btns = document.querySelectorAll('button'),
      wrapper = document.querySelector('.btn-block');


//Обращение к первому элементу массива кнопок для показа имени второго класс в элементе button
console.log(btns[0].classList.item(1));

//Добавление второй кнопке класса red
console.log(btns[1].classList.add('red'));

//Удаление из первой кнопки класса blue
console.log(btns[0].classList.remove('blue'));

// Если в первой кнопке есть класс blue то toggle уберет его из элемента, а если класс blue отсутствует, то он его добавит
console.log(btns[0].classList.toggle('blue'));

// Если вторая кнопка содержит класс red тогда в консоль выведется надпись 'red'
if(btns[1].classList.contains('red')){
    console.log('red');
}

// Обработчик событий меняет цвет второй кнопки двумя способами через toggle (активно) и через условия с add и remove (в комментариях);
btns[0].addEventListener('click', () => {
  //  if(!btns[1].classList.contains('red')){
    //  btns[1].classList.add('red');
        btns[1].classList.toggle('red');
  //  } else{
    // brns[1].classList.remove('red)
  //}
});


// Обработчик событий на элементе с классом .btn-block обращается к дочерним элементам внутри себя
// если дочерний элемент на который кликнул пользователь имеет красный цвет, то выводится надпись 'Hello';
wrapper.addEventListener('click', (e) => {
   // console.dir(e.target) - //выводит в консоль e.target как объект;
  if(e.target && e.target.matches('button.red')){
       console.log('Hello');
    }
});

//Альтернатива предыдущего обработчика, главным отличием является невозможность влиять на вновьдобавленные элементы
//btns.forEach(btn => {
  //  btn.addEventListener('click', () => {
    //    console.log('Hello');
    //});
//});

//Добавление новой кнопки в wrapper
const btn = document.createElement('button');
//Назначение назначение кнопке класса red 
btn.classList.add('red');
// Добавляем кнопку в конец блока wrapper;
wrapper.append(btn);
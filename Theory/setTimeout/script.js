let timerId,
    i = 0;

const btn = document.querySelector('.btn');
const animation = () =>{
    const elem = document.querySelector('.box');
    let pos = 0;

   const frame = () => {
        if(pos == 300){
            clearInterval();
        }else{
           pos++;
           elem.style.top = pos + "px"; 
           elem.style.left = pos + "px"; 
        }
    }
    const id = setInterval(frame, 10);
}

//const logger = (text = 'Hello') =>{
   // if (i === 3){
    //    clearInterval(timerId);
    //}

    //console.log(text);
    //i++;
//}

btn.addEventListener('click', animation);


//const timerId = setTimeout(logger, 5000);
// timerId = setInterval(logger, 5000);


//let id = setTimeout(function log(){
  //  console.log('Hello');
  //  id = setTimeout(log, 500)
//}, 500)

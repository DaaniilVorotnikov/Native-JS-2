'use strict';

try{
    console.log('Normal');
    console.log(gods);
} catch(e){
    console.log(e.name);
    console.log(e.message);
    console.log(e.stack);
} finally{
    console.log('Something wrong')
}

console.log('next');
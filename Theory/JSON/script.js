'use strict';

const persone = {
    name: 'Alex',
    tel: '+72312312',
    parents:{
        mom: 'Olga',
        dad: 'Boomy'
    }
};

//console.log(JSON.parse(JSON.stringify(persone)));

const deepClone = JSON.parse(JSON.stringify(persone));

deepClone.parents.mom = 'Elena';

console.log(persone);
console.log(deepClone);
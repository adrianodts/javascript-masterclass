// Tipos de Dados

// Os tipos de dados na linguagem
// JavaScript se dividem em
// primitivos e objetos


// Os primitivos são imutáveis, ou seja, ao
// longo do tempo seu valor não é alterado

console.log('######################')
console.log('#      Primitive     #')
console.log('######################\n')

console.log(typeof 10);
console.log(typeof "JavaScript");
console.log(typeof true);
console.log(typeof Symbol("iterator"));
console.log(typeof null);
console.log(typeof undefined);


console.log((10).toFixed(2));
console.log(('JavaScript').replace('a', '4'));
console.log((true).toString());
console.log((Symbol("iteator")).toString());

console.log('\n')

// Os objetos são valores que representam
// uma referência em memória que
// pode ser alterada

console.log('######################')
console.log('#        Object      #')
console.log('######################\n')

console.log(typeof function sum(a, b) {return a + b});
console.log(typeof {name: "Linus Torvalds"});
console.log(typeof [1,2,3,4,5,6]);
console.log(typeof /[a-zA-Z]+/);
console.log(typeof (new Date()));

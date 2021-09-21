// function declaration

// funciona por caso do hoisting
console.log(multi(2,3));

function multi(a, b) {
    return a * b;
};

// function expression

// funciona, pois está chamando um método que já foi declarado.
console.log(multi(2,3));

// não funciona com esse tipo de função, pois o método sum não está de forma declarada.
//console.log(sum(1,2));

const sum = function(a, b) {
    return a + b;
};

const subtract = function(a, b) {
    return a - b;
};

// funcão que retorna outra função
const calculator = function(fn) {
    return function (a, b) {
        return fn(a, b);
    };
};

console.log(calculator(sum)(2, 3));
console.log(calculator(subtract)(2, 3));


// chamando função sum com apenas um parâmetro 

// retorna NaN, pois 2 + undefined = NaN
console.log(sum(2));

// chamando função sum com mais parâmetros do que o declarado na function 
// o terceiro parametro 3 é ignorado neste caso
console.log(sum(1, 2, 3));


// default parameters
function div (a = 1, b = 1) {
    return a / b;
};

// passando apenas o primeiro parametro na chamada da função
// retorna o valor 2, pois o segundo parâmetro esta com o valor default de 1,
// logo o número dividido por 1, o resultado é ele mesmo.
console.log(div(2));

// Por meio de uma variável implítcita "arguments" é possível acessar os parâmetros 
// enviados à uma função. 
function letters() {
    for(argument in arguments) {
        console.log(arguments[argument])
    };
    return arguments;
};
console.log(letters('a', 'b', 'c'));

// rest parameter
// precisa ser o último da lista, caso contrário não funciona.
function showLetters(...letters) {
    for(let letter of letters) {
        console.log(letter) // obtém o elemento do array direto
    };
    return letters;
};
console.log(showLetters('x', 'y', 'z'));

// Por meio das funções call e apply é possível 
// invocar uma função passando o this como parâmetro.

const calculateArea = function(fn) {
    return fn(Math.PI * Math.pow(this.radius, 2));
};

const circle = {
    radius: 10,
    calculateArea
};

console.log(calculateArea.call(circle, Math.round));
console.log(calculateArea.apply(circle, [Math.ceil]));


// A operação bind permite encapsular o this dentro da função,
// retornando-a.
const calculateAreaForCircle = calculateArea.bind(circle);
console.log(calculateAreaForCircle(Math.round));
console.log(calculateAreaForCircle(Math.ceil));

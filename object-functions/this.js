// this 
// variável implicita que faz referência para o objeto responsável pela sua invocação.

const calc = function() {
    console.log(this.calculateArea());
    console.log(this.x);
    console.log(this.y);
};

const rectangle = {
    x: 10,
    y: 2,
    // pode ser declarada assim
    calculateArea: function() {
        return this.x * this.y;
    },
    // ou assim, a qual é mais utilizada
    calculate() {
        return this.calculateArea();
    },
    // e assim, caso queira referenciar método fora do escopo de rectangle
    calc
};

console.log(rectangle.calculateArea());
console.log(rectangle.calculate());
rectangle.calc();

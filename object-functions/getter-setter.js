const rectangle = {
    // x: 10,
    // y: 2,
    // ao usar setters, o nome da função deve ser diferente do nome da propriedade
    // por exemplo aqui entra em loop infinito
    // set x(x) {
    //     this.x = x;
    // },    
    // set y(y) {
    //     this.y = y;
    // },
    set x(x) {
        this._x = x;
    },    
    set y(y) {
        this._y = y;
    },
    get area() {
        return this._x * this._y;
    }
};

rectangle.x = 10;
rectangle.y = 2;
console.log(rectangle.area);


const rectangle1 = {};
Object.defineProperty(rectangle1, 'x', {
    set(x) {
        if (x > 0) {
            this._x = x;
        } else {
            console.log('Invalid value for x.')
        }
    }
});
Object.defineProperty(rectangle1, 'y', {
    set(y) {
        if (y > 0) {
            this._y = y;
        } else {
            console.log('Invalid value for y.')
        }
    }
});
Object.defineProperty(rectangle1, 'area', {
    get() {
        return this._x * this._y;
    }
});

rectangle1.x = 10;
rectangle1.y = 2;
console.log(rectangle1.area);


function sum(a, b, callback) {
    /** 
     * usando metodo tradicional 
     */
    setTimeout(function() {
        callback(a + b);
    }, 1000);
};

function subtract(a, b, callback) {
    /** 
     * usando arrow function
     */
    setTimeout(() => callback(a - b), 1000);
};

sum(2, 2, function (result) {
    console.log(result);
});

subtract(2, 2, (result) => {
    console.log(result);
});
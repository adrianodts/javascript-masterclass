function sum(a, b) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            try {
                a = Number.parseInt(a);
                b = Number.parseInt(b);
                if (!a) {
                    throw(`Not a number: a = ${a}`);
                }
                if (!b) {
                    throw(`Not a number: b = ${b}`);
                }
                resolve(a + b);
            } catch (e) {
                reject(e);
            }
        }, Math.random() * 1000);
    });
};

/**
 *  retornando catch em todas as chamadas da promise.
 
sum('a', 1).then(function (a) {
    sum(2, 2).then((b) => {
        sum(a, b).then(result => console.log(result)).catch(error => console.log(error));
    }).catch(error => console.log(error));
}).catch(error => console.log(error));
*/ 


/**
 * trata com apenas um catch, porém precisa retornar cada promise no bloco encadeado
 sum(1, 1).then(function (a) {
     return sum(2, 2).then((b) => {
         return sum(a, b).then(result => {
             console.log(result);
             //console.timeEnd("performance");
            });
        })
    }).catch(error => console.log(error));
    */ 

/**
 * executa várias promises de uma só vez.
 Promise.all([
     sum(1,1),
     sum(2,2)
    ]).then((values) => {
        console.log(values); // array com o resultado 
        const [a, b] = values;
        return sum(a, b).then(result => {
            console.log(result);
        });
    }).catch(error => console.log(error));
*/


/**
 * executa a promise que retornar sucesso primeiro.
 */
 Promise.race([
    sum(1,1),
    sum(2,2)
]).then((value) => {
    return sum(value, value).then(result => {
        console.log(result);
    });
}).catch(error => console.log(error));
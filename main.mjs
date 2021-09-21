import Database from './database.mjs'

// try {
    const database = new Database();
    database.execute('create table author (id number, name string, age number, city string, state string, country string)')
        .then(() => {
            return Promise.all([
                database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)"),
                database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)"),
                database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)")
            ]).then(() => {
                return database.execute("select name, age from author").then((resolve) => {
                    console.log(JSON.stringify(resolve, undefined, ' '));
                });
            })
        }).catch(error => console.log(error.message));
    //database.execute("select id, name from author");
    //database.execute("delete from author where id = 2");
    //console.log(JSON.stringify(database.execute("select name, age from author"), undefined, ' '));
    //database.execute("delete from author");
    //console.log(JSON.stringify(database.execute("select name, age from author where id = 1"), undefined, '   '));
    // console.log(JSON.stringify(database, undefined, '   '));
// } catch (e) {
//     console.log(e.error);   
// }
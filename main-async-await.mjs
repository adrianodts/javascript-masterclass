import Database from './database.mjs'

(async () => {
    try {
        const database = new Database();
        await database.execute('create table author (id number, name string, age number, city string, state string, country string)');
        return await Promise.all([
            database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)"),
            database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)"),
            database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)")
        ]).then(async () => {
            await database.execute("delete from author where id = 2");
            console.log(JSON.stringify(await database.execute("select name, age from author"), undefined, ' '));
            await database.execute("delete from author");
            console.log(JSON.stringify(await database.execute("select name, age from author where id = 1"), undefined, '   '));
        }).catch(error => console.log(error.message));
    } catch (e) {
        console.log(e.error);   
    }
})();
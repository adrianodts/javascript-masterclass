const sqlStm = "create table author (id number, name string, age number, city string, state string, country string)";

const regExp = /create table (\w+) \((.+)\)/;
const parsedStm = sqlStm.match(regExp)
const tableName = parsedStm[1];
const columns = parsedStm[2].split(', ');

const database = {
    'tables' : {
        [tableName] : {
            'columns': {},
        },
    }
};

for (let column of columns) {
    column = column.split(' ');
    const name = column[0];
    const type = column[1];
    database.tables[tableName].columns[name] = type;
}
database.tables[tableName].data = [];

console.log(JSON.stringify(database, undefined, '   '));

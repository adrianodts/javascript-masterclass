const sqlStm = "create table author (id number, name string, age number, city string, state string, country string)";

const regExp = /create table (\w+) \((.+)\)/;
const parsedStm = sqlStm.match(regExp)
const tableName = parsedStm[1];
const columns = parsedStm[2].split(', '); //.map(c => c.split(' '));

console.log(`tablename: ${tableName}`);

for (let columnAndDataType in columns) {
    const column = { 
        name: columns[columnAndDataType].split(' ')[0], 
        dataType: columns[columnAndDataType].split(' ')[1] 
    };
    console.log(`column: [${column.name}] of datatype: (${column.dataType})`);
}
const DatabaseError = function(statement, message) {
    this.statement = statement;
    this.message = message;
    this.error = `"${this.message}: '${this.statement}'"`;
};

const database = {
    tables: {},
    createTable(sqlStm) {
        const regExp = /create table (\w+) \((.+)\)/;
        const parsedStm = sqlStm.match(regExp)
        const tableName = parsedStm[1];
        this.tables[tableName] = {
            'columns': {},
        }; 
        const columns = parsedStm[2].split(', ');
        for (let column of columns) {
            column = column.split(' ');
            const name = column[0];
            const type = column[1];
            this.tables[tableName].columns[name] = type;
        }
        this.tables[tableName].data = [];
    },
    execute(sqlStm) {
        if (sqlStm.startsWith('create table')) {
            return this.createTable(sqlStm);
        } else {
            throw new DatabaseError(sqlStm, 'Syntax error'); 
        }
    }
};

try {
    //database.execute('create table author (id number, name string, age number, city string, state string, country string)');
    database.execute("select id, name from author");
    console.log(JSON.stringify(database, undefined, '   '));
} catch (e) {
    console.log(e.error);   
}
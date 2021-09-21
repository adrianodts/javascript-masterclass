const database = {
    'tables' : {
        [this.tableName] : {
            'columns': {},
        },
    },
    set tableName(tableName) {
        this._tableName = tableName;
    },
    get tableName() {
        return this._tableName;
    },
    createTable(sqlStm) {
        const regExp = /create table (\w+) \((.+)\)/;
        const parsedStm = sqlStm.match(regExp)
        tableName = parsedStm[1];
        const columns = parsedStm[2].split(', ');
        for (let column of columns) {
            column = column.split(' ');
            const name = column[0];
            const type = column[1];
            this.tables[this.tableName].columns[name] = type;
        }
        this.tables[this.tableName].data = [];
        console.log(JSON.stringify(this, undefined, '   '));
    },
    execute(sqlStm) {
        if (sqlStm.startsWith('create table')) {
            this.createTable(sqlStm);
        } else {
            throw('Invalid sql statement!');
        }
    }
};

try {
    database.execute('create table author (id number, name string, age number, city string, state string, country string)');
} catch (error) {
    console.log(error);   
}
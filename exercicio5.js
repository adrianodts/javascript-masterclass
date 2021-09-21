class DatabaseError {
    constructor(statement, message) {
        this.statement = statement;
        this.message = message;
        this.error = `"${this.message}: '${this.statement}'"`;
    }
};

class Parser {
    constructor() {
        this.commands = new Map([
            ['createTable', /create table ([a-z]+) \((.+)\)/], 
            ['insert', /insert into ([a-z]+) \((.+)\) values \((.+)\)/],
            ['delete', /delete from ([a-z]+)(?: where (.+))?/],
            ['select', /select (.+) from ([a-z]+)(?: where (.+))?/]
        ]);
    }
    parse(sqlStm) {
        for(let [command, regexp] of this.commands) {
            const parsedStatement = sqlStm.match(regexp);
            if (parsedStatement) {
                return {
                    command,
                    parsedStatement
                }
            }
        };
        throw new DatabaseError(sqlStm, 'Syntax error');
    }
};

class Database {
    constructor() {
        this.tables = {};
        this.parser = new Parser()
    }
    createTable(parsedStatement) {
        let [, tableName, columns] = parsedStatement;
        this.tables[tableName] = {
            columns: {},
            data: []
        }; 
        columns = columns.split(', ');
        for (let column of columns) {
            column = column.trim().split(' ');
            const [name, type] = column;
            this.tables[tableName].columns[name] = type;
        }
    };

    select(parsedStatement) {
        let [, columns, tableName, whereClause] = parsedStatement;
        columns = columns.split(', ');
        let rows = this.tables[tableName].data;
        if (whereClause) {
            const [columnWhere, valueWhere] = whereClause.split(' = ');
            rows = rows.filter(data => data[columnWhere] === valueWhere);
        }
        rows = rows.map((data) => {
            let selectedRow = {};
            columns.forEach(column => {
                selectedRow[column] = data[column];
            });
            return selectedRow;
        });
        return rows;
    };

    insert(parsedStatement) {
        let [, tableName, columns, values] = parsedStatement;
        columns = columns.split(', ');
        values = values.split(', ');
        let row = {};
        for(let i=0; i < columns.length; i++) {
            const column = columns[i];
            const value = values[i];
            row[column] = value;
        }
        this.tables[tableName].data.push(row);
    };

    delete(parsedStatement) {
        let [, tableName, whereClause] = parsedStatement;
        if (whereClause) {
            const [columnWhere, columnValue] = whereClause.split(' = ');
            this.tables[tableName].data = this.tables[tableName].data.filter(data => {
                return data[columnWhere] !== columnValue;
            })
        } else {
            this.tables[tableName].data = [];
        }
    };

    execute(sqlStm) {
        const result = this.parser.parse(sqlStm);
        if (result) {
            return this[result.command](result.parsedStatement);
        }
    }
};

try {
    const database = new Database();
    database.execute('create table author (id number, name string, age number, city string, state string, country string)');
    //database.execute("select id, name from author");
    database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
    database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
    database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
    database.execute("delete from author where id = 1");
    console.log(JSON.stringify(database.execute("select name, age from author"), undefined, ' '));
    database.execute("delete from author");
    console.log(JSON.stringify(database.execute("select name, age from author"), undefined, ' '));
    //console.log(JSON.stringify(database.execute("select name, age from author where id = 1"), undefined, '   '));
    // console.log(JSON.stringify(database, undefined, '   '));
} catch (e) {
    console.log(e.error);   
}
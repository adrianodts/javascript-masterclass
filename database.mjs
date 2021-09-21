import Parser from "./parser.mjs";
import DatabaseError from "./databaseerror.mjs";

export default class Database {
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
        // const that = this;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const result = this.parser.parse(sqlStm);
                if (result) {
                    resolve(this[result.command](result.parsedStatement));
                }
                const message = `Syntax error: "${sqlStm}"`;
                reject(new DatabaseError(sqlStm, message));
            }, 1000);
        });
    };

};
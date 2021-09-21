export default class Parser {
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
    }
};
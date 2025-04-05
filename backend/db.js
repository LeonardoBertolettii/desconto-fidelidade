const Database = require('better-sqlite3');
const db = new Database('banco.sqlite');
module.exports = db;

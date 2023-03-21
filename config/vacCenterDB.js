const mysql = require("mysql");

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '177012540',
    database: 'vacCenter'
});

module.exports = connection;
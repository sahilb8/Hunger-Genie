const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'bhanu@bhanu',
    database: 'hunger_genie',
});

module.exports = pool.promise();
/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('select * from m_achievement ', (err, results) => {
     console.log(results)
});

console.log('Success: Database Created!')

connection.end();

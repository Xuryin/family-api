let express = require('express')
let app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function (request, response) {
    response.send('Hello World!')
})

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'))
})

/*var mysql = require('mysql')
var connection = mysql.createConnection({
    host: '47.95.234.135',
    user: 'xuryin',
    password: 'xuryin0127',
    database: 'myself'
})

connection.connect()

connection.query('select * from m_user', function (error, results, fields) {
    if (error) throw error
    console.log(results)
})

connection.end()*/

/*
var mysql = require('mysql');
var pool  = mysql.createPool({
    host: '47.95.234.135',
    user: 'xuryin',
    password: 'xuryin0127',
    database: 'myself'
});

pool.getConnection(function (err, connection) {
    if (err) throw err

    connection.query('select * from m_user', function (error, results, fields) {
        console.log(results)
        connection.release()
        if (error) throw error
    })
})

// 触发 release
pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});
*/

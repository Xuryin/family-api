let express = require('express')
let bodyParser = require("body-parser");
let passport = require('passport');
let session = require("express-session");
let LocalStrategy = require('passport-local').Strategy;
let app = express()
app.use("*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
});
app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret: "cats"}))
app.use(express.static(__dirname + '/public'))
app.use(passport.initialize())
app.use(passport.session())

require('./scripts/create_database')
require('./src/routes')(app);
app.get('/', function (request, response) {
    response.send('Hello World!')
})

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'))
})


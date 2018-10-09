var crypto = require('crypto'),
    md5 = crypto.createHash("md5"),
    passport = require('passport')

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}


exports.registerPage = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log(req.query.password)
    let username = req.query.username
    let password = cryptPwd(req.query.password)
    console.log(password)
    let code = req.query.code
    if (username || password || code) {

    }
    res.send({status: 1, data: "this is the results", msg: 'success'})
}


exports.registerPost = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    // 打印post请求的数据内容
    console.log(req.body);
    res.send({status: 1, data: "this is the results", msg: 'success'})
}


exports.loginPage = function(req, res) {
    res.render('login/index', {username: req.flash('username')});
}


exports.checkLogin = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err || !user) {
            req.flash('username', req.body.un);
            req.flash('error', info.message);
            return res.redirect('/login');
        }
        req.logIn(user, function(err) {
            if (err) {
                req.flash('error', info.message);
                return res.redirect('/login');
            }
            req.flash('success', 'Welcome!');
            return res.redirect('/home');
        });
    })(req, res, next);
}


exports.logout = function(req, res) {
    req.logout();
    req.flash('info', 'You are now logged out.');
    res.redirect('/login');
}

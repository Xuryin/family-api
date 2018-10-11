var crypto = require('crypto'),
    md5 = crypto.createHash("md5"),
    passport = require('passport')

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}
let pool = require('../../scripts/mysql')

exports.registerPost = function(req, res) {
    console.log(req.body);
    let user = [];
    user[0] = req.body.username;
    user[1] = cryptPwd(req.body.password);
    pool.getConnection('insert into m_user(uname,password) values(?,?);',user,(err,result)=>{
        if (err){
            throw err
        }
        console.log(result)
    })
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

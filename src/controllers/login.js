let crypto = require('crypto'),
    md5 = crypto.createHash("md5"),
    passport = require('passport'),
    pool = require('../../scripts/mysql')


function cryptPwd (password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

exports.cryptPwd = cryptPwd

exports.registerPost = function(req, res) {
    let user = [];
    user[0] = req.body.username;
    user[1] = cryptPwd(req.body.password);
    pool.getConnection('insert into m_user(uname,password) values(?,?);',user,(err,result)=>{
        if (err){
            throw err
        }
    })
    res.send({status: 1, data: "this is the results", msg: 'success'})
}

exports.loginPage = function(req, res) {
    res.render('login/index', {username: req.flash('username')});
}


exports.checkLogin = (req, res, next)  => {
    console.log(req.body)
    passport.authenticate('local-login'),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        }
}


exports.logout = function(req, res) {
    req.logout();
    req.flash('info', 'You are now logged out.');
    res.redirect('/login');
}

const User = require('../models/user');
exports.getLogin =  (req,res,next) => {
    console.log(req.session.isLoggedIn);
    res.render('auth/login',{
        pageTitle: 'Login',
        path:'/login',
        isAuthenticated : req.session.isLoggedIn,
    });
}

exports.postLogin = (req,res,next) => {
    User.findById("63f2069e8497c1f3f0de70f8")
    .then(user => {
        console.log('in main app.js: ' + JSON.stringify(user));
        req.session.user = user;
        req.session.isLoggedIn = true;
        req.session.save((resp) => {
            res.redirect('/');
        })
    })
    .catch(err => {
        console.log(err);
    })
}

exports.postLogout = (req,res,next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    })
}


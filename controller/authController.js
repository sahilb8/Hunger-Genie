const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin =  (req,res,next) => {
    let msg = (req.flash('error'))[0];
    console.log(msg);
    if(!msg){
        msg = '';
    }
    
    console.log('POPOPOPOPOPOPOPO');
    console.log(msg);
    res.render('auth/login',{
        pageTitle: 'Login',
        path:'/login',
        errorMessage: msg,
    });
}

exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
    .then(user => {
        if(!user) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
        }
        bcrypt.compare(password, user.password)
        .then((didMatch) => {
            if(didMatch){
                req.session.user = user;
                return req.session.save((resp) => {
                    res.redirect('/');
                })
            }
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
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


exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({email: email})
    .then((userDoc) => {
        if(userDoc){
            return null;
        }
        return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
        if(hashedPassword == null){
            return 'user exists'
        } else {
            const user = new User({
                email: email,
                password: hashedPassword,
                cart : {items:[]}
            });
    
            console.log('created user object');
            return user.save()
        }
    })
    .then((resp) => {
        console.log('saved user object');
        if(resp == 'user exists'){
            res.redirect('/login');
        } else {
            res.redirect('/signup');
        }
    })
    .catch(err => console.log(err))
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      isAuthenticated: false
    });
  };
  
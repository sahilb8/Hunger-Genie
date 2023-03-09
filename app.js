const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);
const csurf = require("tiny-csrf");
const flash = require('connect-flash');

const adminRouter = require('./routes/admin');
const restaurantRouter = require('./routes/restaurant');
const authRouter = require('./routes/auth');
// const sequelize = require('./utils/database');

// const Dish = require('./models/dish');
const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');

const error = require('./controller/error');
const req = require('express/lib/request');

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');


const store = new mongoDbStore({
    uri: 'mongodb://127.0.0.1:27017/hunger_genie',
    collection : 'session'
});

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({saveUninitialized: false, secret: 'my long string', resave: false, store: store}))

app.use((req,res,next) => {
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        next();
    })

})


app.use((req,res,next) => {
    const csrfToken = '123456789iamasecret987654321look';
    res.locals.isAuthenticated = false;
    res.locals.csrfToken = csrfToken;
    next();
});

app.use(flash());

app.use('/admin',adminRouter);
app.use(restaurantRouter);
app.use(authRouter);

app.use(error.get404);

// Dish.belongsTo(User,{constraints: true, onDelete:'CASCADE'})
// User.hasMany(Dish);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Dish, {through : CartItem});
// Dish.belongsToMany(Cart, {through : CartItem})
// Order.hasOne(User);
// User.hasMany(Order);
// Order.belongsToMany(Dish, { through: OrderItem});

// sequelize
// // .sync({force: true})
// .sync()
// .then((response) => {
//    return User.findByPk(1)
// }).then((user) => {
//     if(!user){
//         return User.create({name:'Sahil' , email:'sahil@gmail.com'});
//     }
//     return user;
// })
// .then(user => {
//     console.log('user created');
//     return user.createCart()
// })
// .then(cart => {
//     console.log('cart created');
//     app.listen(3000);
// })
// .catch((err) => {
//     console.log(err);
// })

mongoose.connect('mongodb://127.0.0.1:27017/hunger_genie')
.then(result => {
    console.log('connection succesfull');

    app.listen(3000);
})
.catch(err => console.log(err));
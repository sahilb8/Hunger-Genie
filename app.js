const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRouter = require('./routes/admin');
const restaurantRouter = require('./routes/restaurant');
const mongoConnect = require('./utils/database').mongoConnect;
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


app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next) => {
    User.findById("63edd324aa1358e81aacb6b5")
    .then(user => {
        console.log('in main app.js: ' + JSON.stringify(user));
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch(err => {
        console.log(err);
    })
});

app.use('/admin',adminRouter);
app.use(restaurantRouter);

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

mongoConnect(() => {
    app.listen(3000);
});
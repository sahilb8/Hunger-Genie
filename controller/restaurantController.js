const Dish = require('../models/dish');


exports.getDishes =  (req,res,next) => {
    Dish.fetchAll((dishes) => {
         res.render('restaurant/dish-list',{
             dishes: dishes,
             pageTitle: 'Restaurant',
             path:'/dishes',
         });
     });
 
}

exports.getCart =  (req,res,next) => {
    Dish.fetchAll((dishes) => {
         res.render('restaurant/cart',{
             dishes: dishes,
             pageTitle: 'Cart',
             path:'/cart',
         });
     });
 
}

exports.getIndex =  (req,res,next) => {
    Dish.fetchAll((dishes) => {
         res.render('restaurant/index',{
             dishes: dishes,
             pageTitle: 'Restaurant',
             path:'/',
         });
     });
 
}

exports.getCheckout =  (req,res,next) => {
    Dish.fetchAll((dishes) => {
         res.render('restaurant/checkout',{
             dishes: dishes,
             pageTitle: 'Checkout',
             path:'/checkout',
         });
     });
 
}

exports.getOrders =  (req,res,next) => {
    res.render('restaurant/orders',{
        pageTitle: 'Orders',
        path:'/orders',
    });
}


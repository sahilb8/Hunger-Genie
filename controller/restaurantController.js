const Dish = require('../models/dish');
const Cart = require('../models/cart');


exports.getDishes =  (req,res,next) => {
    Dish.fetchAll().then(([dishData,fieldData]) => {
        res.render('restaurant/dish-list',{
            dishes: dishData,
            pageTitle: 'Restaurant',
            path:'/dishes',
        });
    }).catch((err) => {
        console.log(err);
    });
}

exports.getDish =  (req,res,next) => {
    const dishId = req.params.dishId;
    Dish.fetchDishById(dishId).then(([dish, rowData])=> {
        console.log(dish);
        res.render('restaurant/dish-details',{
            dish: dish[0],
            pageTitle: 'Dish',
            path:'/dishes',
        });
    }).catch((err)=>{
        console.log(err);
    });
}

exports.getCart =  (req,res,next) => {
    Dish.fetchAll().then(([dishData,fieldData]) => {
        res.render('restaurant/cart',{
            dishes: dishData,
            pageTitle: 'Cart',
            path:'/cart',
        });
    }).catch((err) => {
        console.log(err);
    });
}

exports.postCart =  (req,res,next) => {
  const dishId = req.body.dishId;
  Dish.fetchDishById(dishId).then(([dish, rowData])=> {
    Cart.addDish(dish[0].id ,dish[0].price);
    res.redirect('/cart');;
}).catch((err)=>{
    console.log(err);
});

}



exports.getIndex =  (req,res,next) => {
     Dish.fetchAll().then(([dishData,fieldData]) => {
        res.render('restaurant/index',{
            dishes: dishData,
            pageTitle: 'Restaurant',
            path:'/',
        });
    }).catch((err) => {
        console.log(err);
    });
 
}

exports.getCheckout =  (req,res,next) => {
    Dish.fetchAll().then(([dishData,fieldData]) => {
        res.render('restaurant/checkout',{
            dishes: dishData,
            pageTitle: 'Checkout',
            path:'/checkout',
        });
    }).catch((err) => {
        console.log(err);
    }); 
}

exports.getOrders =  (req,res,next) => {
    res.render('restaurant/orders',{
        pageTitle: 'Orders',
        path:'/orders',
    });
}


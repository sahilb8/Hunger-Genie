const Dish = require('../models/dish');
const Cart = require('../models/cart');
const User = require('../models/user');


exports.getDishes =  (req,res,next) => {
    console.log('hererererx');
    Dish.fetchAll()
    .then((dishes) => {
        res.render('restaurant/dish-list',{
            dishes: dishes,
            pageTitle: 'Restaurant',
            path:'/dishes',
        });
    }).catch((err)=> {
        console.log(err);
    });
}

exports.getDish =  (req,res,next) => {
    const dishId = req.params.dishId;
    Dish.findById(dishId).then((dish)=> {
        console.log(dish);
        res.render('restaurant/dish-details',{
            dish: dish,
            pageTitle: 'Dish',
            path:'/dishes',
        });
    }).catch((err)=>{
        console.log(err);
    });
}

exports.getCart =  (req,res,next) => {
    req.user.getCart().then(dishes=> {
        res.render('restaurant/cart',{
            dishes: dishes,
            pageTitle: 'Cart',
            path:'/cart',
        });
    }).catch(err => {
        console.log(err);
    })
}

exports.postCart =  (req,res,next) => {
  const dishId = req.body.dishId;
  Dish.findById(dishId)
  .then(dish => {
      req.user.addToCart(dish)
      .then(result => {
          console.log('dish added');
          res.redirect('/cart');
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));

}



exports.getIndex =  (req,res,next) => {
    Dish.fetchAll()
    .then((dishes) => {
        res.render('restaurant/index',{
            dishes: dishes,
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
    req.user.getOrders()
    .then(orders => {
        console.log(orders);
        res.render('restaurant/orders',{
            pageTitle: 'Orders',
            path:'/orders',
            orders: orders
        });
    })
    .catch(err => console.log(err));
}

exports.postCartDeleteDish = (req,res,next) => {
    const dishId = req.body.dishId;
    console.log('MNNMNMNMNMNMNMNMNMN');
    console.log(dishId);
    req.user.postCartDeleteDish(dishId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));

}

exports.postCreateOrder = (req,res,next) => {
   req.user.addOrder()
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
}


const Dish = require('../models/dish');
const Cart = require('../models/cart');
const User = require('../models/user');
const Order = require('../models/order');


exports.getDishes =  (req,res,next) => {
    console.log('hererererx');
    Dish.find()
    .then((dishes) => {
        res.render('restaurant/dish-list',{
            dishes: dishes,
            pageTitle: 'Restaurant',
            path:'/dishes',
            isAuthenticated : req.session.isLoggedIn,
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
            isAuthenticated : req.session.isLoggedIn,
        });
    }).catch((err)=>{
        console.log(err);
    });
}

exports.getCart =  (req,res,next) => {
    req.user.populate('cart.items.dishId')
    .then(user=> {
        const dishes = user.cart.items;
        console.log(JSON.stringify(user));
        res.render('restaurant/cart',{
            dishes: dishes,
            pageTitle: 'Cart',
            path:'/cart',
            isAuthenticated : req.session.isLoggedIn,
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
    Dish.find()
    .then((dishes) => {
        res.render('restaurant/index',{
            dishes: dishes,
            pageTitle: 'Restaurant',
            path:'/',
            isAuthenticated : req.session.isLoggedIn,
        });
    }).catch((err) => {
        console.log(err);
    });
 
}

exports.getCheckout =  (req,res,next) => {
    Dish.find().then(([dishData,fieldData]) => {
        res.render('restaurant/checkout',{
            dishes: dishData,
            pageTitle: 'Checkout',
            path:'/checkout',
            isAuthenticated : req.session.isLoggedIn,
        });
    }).catch((err) => {
        console.log(err);
    }); 
}

exports.getOrders =  (req,res,next) => {
    Order.find({'user.userId': req.session.user._id})
    .then(orders => {
        console.log(orders);
        res.render('restaurant/orders',{
            pageTitle: 'Orders',
            path:'/orders',
            orders: orders,
            isAuthenticated : req.session.isLoggedIn,
        });
    })
    .catch(err => console.log(err));
}

exports.postCartDeleteDish = (req,res,next) => {
    const dishId = req.body.dishId;
    req.user.postCartDeleteDish(dishId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));

}

exports.postCreateOrder = (req,res,next) => {
    req.user.populate('cart.items.dishId')
    .then(user => {
        const dishes = user.cart.items.map(d => {
            return {quantity:d.quantity , dish: {...d.dishId._doc}}
        })
        const order = new Order({
            user : {
                name: req.session.user.name,
                userId : req.session.user,
            },
            dishes : dishes,
        });
        return order.save();
    })
    .then(result => {
        return req.user.clearCart()
    })
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
}


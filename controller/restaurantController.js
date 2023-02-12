const Dish = require('../models/dish');
const Cart = require('../models/cart');


exports.getDishes =  (req,res,next) => {
    Dish.findAll().then((dishes) => {
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
    Dish.findByPk(dishId).then((dish)=> {
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
    req.user.getCart().then(cart => {
        cart.getDishes().then(dishes=> {
            console.log(dishes);
            res.render('restaurant/cart',{
                dishes: dishes,
                pageTitle: 'Cart',
                path:'/cart',
            });
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    });
}

exports.postCart =  (req,res,next) => {
  const dishId = req.body.dishId;
  let fetchedCart;
  let newQuantity = 1;
    req.user.getCart().then(cart => {
        fetchedCart = cart;
        cart.getDishes({where :{ id: dishId}})
        .then(dishes => {
            let dish;
            if(dishes.length > 0){
                dish = dishes[0];
            }
            if(dish) {
                let oldQuantity  = dish.cartItem.quantity;
                newQuantity = oldQuantity + 1;
            }
            return Dish.findByPk(dishId)
        })
        .then(dish => {
            return fetchedCart.addDish(dish, { through: { quantity: newQuantity}})
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));

}



exports.getIndex =  (req,res,next) => {
    Dish.findAll().then((dishes) => {
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
    req.user.getOrders({include: ['dishes']})
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
    req.user.getCart()
    .then(cart => {
        cart.getDishes({where: { id: dishId}})
        .then(dishes => {
            const dish = dishes[0];
            return dish.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

exports.postCreateOrder = (req,res,next) => {
    let fetchedCart;
   req.user.getCart()
   .then(cart => {
       fetchedCart = cart;
       return cart.getDishes();
   })
   .then(dishes => {

    return req.user.createOrder()
    .then(order => {
        return order.addDish(dishes.map(dish => {
            dish.orderItem = { quantity : dish.cartItem.quantity }
            return dish;
        }));
    })
    .then(result => {
        return fetchedCart. setDishes(null);
    })
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));

   })
   .catch(err => console.log(err));
}


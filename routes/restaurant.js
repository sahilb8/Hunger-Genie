const express = require("express");
const path = require('path');

const router = express.Router();

const restaurantController = require('../controller/restaurantController');

const isAuth = require('../middleware/is-auth');

router.get('/', restaurantController.getIndex);

router.get('/cart',isAuth, restaurantController.getCart);

router.post('/cart',isAuth, restaurantController.postCart);

router.post('/cart-delete-item',isAuth, restaurantController.postCartDeleteDish);

router.get('/orders',isAuth, restaurantController.getOrders);

router.get('/dishes/:dishId',isAuth, restaurantController.getDish);

router.get('/dishes',isAuth, restaurantController.getDishes);

// // router.get('/checkout',isAuth, restaurantController.getCheckout);

router.post('/create-order',isAuth, restaurantController.postCreateOrder);



module.exports  = router;

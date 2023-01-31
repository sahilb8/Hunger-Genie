const express = require("express");
const path = require('path');

const router = express.Router();

const restaurantController = require('../controller/restaurantController');

router.get('/',restaurantController.getIndex);

router.get('/cart',restaurantController.getCart);

router.post('/cart',restaurantController.postCart);

router.get('/orders',restaurantController.getOrders);

router.get('/dishes/:dishId',restaurantController.getDish);

router.get('/dishes',restaurantController.getDishes);

router.get('/checkout',restaurantController.getCheckout);



module.exports  = router;

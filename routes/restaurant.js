const express = require("express");
const path = require('path');

const routeDir = require('../utils/path');
const router = express.Router();

const adminData = require('./admin');

router.get('/',(req,res,next) => {
    const dishes = adminData.dishes;
    res.render('restaurant',{
        dishes: dishes,
        pageTitle: 'Restaurant',
        path:'/',
    });
});

module.exports = router;

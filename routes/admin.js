const path = require('path');

const express = require('express');
const router = express.Router();
const routeDir = require('../utils/path');

const dishes = [];

router.get('/add-biryani',(req,res,next) => {
    res.render('add-biryani',{
        pageTitle: 'Add Biryani',
        path:'admin/add-biryani',
    });

});
 
router.post('/add-biryani',(req,res,next) => {
    dishes.push({'title': req.body.title});
    res.redirect('/');
});

exports.routes = router;
exports.dishes = dishes;
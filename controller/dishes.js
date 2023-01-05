const Dish = require('../models/dish');

exports.getAddBiryani =  (req,res,next) => {
    res.render('admin/add-dish',{
        pageTitle: 'Add Dish',
        path:'admin/add-dish',
    });
}

exports.postAddBiryani = (req,res,next) => {
    const dish = new Dish(req.body.title);
    dish.save();
    res.redirect('/');
}

exports.getDishes =  (req,res,next) => {
   Dish.fetchAll((dishes) => {
        res.render('restaurant/dish-list',{
            dishes: dishes,
            pageTitle: 'Restaurant',
            path:'/',
        });
    });

}
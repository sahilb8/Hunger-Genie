const Dish = require('../models/dish');

exports.getAddBiryani =  (req,res,next) => {
    res.render('add-biryani',{
        pageTitle: 'Add Biryani',
        path:'admin/add-biryani',
    });
}

exports.postAddBiryani = (req,res,next) => {
    const dish = new Dish(req.body.title);
    dish.save();
    res.redirect('/');
}

exports.getDishes =  (req,res,next) => {
   Dish.fetchAll((dishes) => {
        res.render('restaurant',{
            dishes: dishes,
            pageTitle: 'Restaurant',
            path:'/',
        });
    });

}
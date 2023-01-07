const Dish = require('../models/dish');

exports.getAddBiryani =  (req,res,next) => {
    res.render('admin/add-dish',{
        pageTitle: 'Add Dish',
        path:'admin/add-dish',
    });
}

exports.postAddBiryani = (req,res,next) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const dish = new Dish(title, price, description, imageUrl);
    dish.save();
    res.redirect('/');
}

exports.getDishes =  (req,res,next) => {
    Dish.fetchAll((dishes) => {
         res.render('admin/dishes',{
             dishes: dishes,
             pageTitle: 'Admin Dishes',
             path:'/admin/dishes',
         });
     });
 
 }

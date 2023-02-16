const mongodb = require('mongodb');
const Dish = require('../models/dish');

exports.getAddDish =  (req,res,next) => {
    res.render('admin/edit-dish',{
        pageTitle: 'Add Dish',
        path:'admin/add-dish',
        editing: false,
    });
}

exports.postAddDish = (req,res,next) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    let newDish = new Dish(title, price, imageUrl, description, null, req.user._id);
    newDish.save()
    .then((response) => {
        console.log('created dish');
        res.redirect('/');
        
    }).catch((err) => {
        console.log(err);
    });
}

exports.getEditDish =  (req,res,next) => {
    const editing = req.query.edit;
    const dishId = req.params.dishId;
    if(!editing){
        return res.redirect('/');
    }

    Dish.findById(dishId)
    .then((dish)=> {
        if(!dish){
            return res.redirect('/');
        }
        res.render('admin/edit-dish',{
            pageTitle: 'Edit Dish',
            path:'admin/edit-dish',
            editing: editing,
            dish: dish,
        });
    }).catch((err)=>{
        console.log(err);
    });
   
}



exports.postEditDish = (req,res,next) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const dishId = req.body.dishId;

    let updatedDish = new Dish(title, price, imageUrl, description, dishId);

    
    updatedDish
    .save()
    .then(result => {
        console.log('dish updated');
        res.redirect('/');
    }).catch((err)=> {
        console.log(err);
    })
}

exports.getDishes =  (req,res,next) => {
    Dish.fetchAll()
    .then((dishes) => {
        res.render('admin/dishes',{
            dishes: dishes,
            pageTitle: 'Admin Dishes',
            path:'/admin/dishes',
        });
    }).catch((err) => {
        console.log(err);
    });
 }

 exports.postDeleteDish = (req,res,next) => {
     const dishId = req.body.dishId;

     Dish.deleteById(dishId)
     .then(result => {
         console.log('destroyed dish');
         res.redirect('/');
     }).catch((err) => {
         console.log(err);
     });
 }

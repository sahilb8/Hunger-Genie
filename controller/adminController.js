const mongodb = require('mongodb');
const Dish = require('../models/dish');

exports.getAddDish =  (req,res,next) => {
    res.render('admin/edit-dish',{
        pageTitle: 'Add Dish',
        path:'admin/add-dish',
        editing: false,
        isAuthenticated : req.session.isLoggedIn,
    });
}

exports.postAddDish = (req,res,next) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    let newDish = new Dish({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        userId: req.session.user.userId,
    });
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
            isAuthenticated : req.session.isLoggedIn,
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

    let updatedDish = new Dish({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
    });

    console.log(updatedDish);
    
    Dish.updateOne({_id: new mongodb.ObjectId(dishId)}, {updatedDish})
    .then(result => {
        console.log('dish updated');
        res.redirect('/');
    }).catch((err)=> {
        console.log(err);
    })
}

exports.getDishes =  (req,res,next) => {
    Dish.find()
    .then((dishes) => {
        res.render('admin/dishes',{
            dishes: dishes,
            pageTitle: 'Admin Dishes',
            path:'/admin/dishes',
            isAuthenticated : req.session.isLoggedIn,
        });
    }).catch((err) => {
        console.log(err);
    });
 }

 exports.postDeleteDish = (req,res,next) => {
     const dishId = req.body.dishId;

     Dish.findByIdAndRemove(dishId)
     .then(result => {
         console.log('destroyed dish');
         res.redirect('/');
     }).catch((err) => {
         console.log(err);
     });
 }

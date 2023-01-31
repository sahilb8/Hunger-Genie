const Dish = require('../models/dish');

exports.getAddDish =  (req,res,next) => {
    res.render('admin/edit-dish',{
        pageTitle: 'Add Dish',
        path:'admin/add-dish',
    });
}

exports.postAddDish = (req,res,next) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const dish = new Dish(title, price, description, imageUrl);
    dish.save().then(()=>{
        res.redirect('/');
    }).catch((err) => {
        console.log(err);
    });
}

exports.getEditDish =  (req,res,next) => {
    const isEditMode = req.query.edit;
    const dishId = req.params.dishId;
    console.log(req.query);
    if(!isEditMode){
        return res.redirect('/');
    }
    Dish.fetchDishById(dishId).then(([dish, rowData])=> {
        if(!dish){
            return res.redirect('/');
        }
        res.render('admin/edit-dish',{
            pageTitle: 'Edit Dish',
            path:'admin/edit-dish',
            editMode: isEditMode,
            dish: dish[0],
        });
    }).catch((err)=>{
        console.log(err);
    });
   
}



exports.postEditDish = (req,res,next) => {
    
}

exports.getDishes =  (req,res,next) => {
    Dish.fetchAll().then(([dishData,fieldData])=>{
        res.render('admin/dishes',{
            dishes: dishData,
            pageTitle: 'Admin Dishes',
            path:'/admin/dishes',
        });
    }).catch((err) => {
        console.log(err);
    })
 
 }

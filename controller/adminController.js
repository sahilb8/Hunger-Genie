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
    req.user.createDish({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
    })
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

    req.user.getDishes({where : { id : dishId}})
    // Dish.findByPk(dishId)
    .then((dishes)=> {
        const dish = dishes[0];
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
    console.log(req.body);
    Dish.findByPk(dishId).then((dish) => {
        dish.title = title;
        dish.description = description;
        dish.imageUrl = imageUrl;
        dish.price = price;
        return dish.save();
    })
    .then(result => {
        console.log('dish updated');
        res.redirect('/');
    }).catch((err)=> {
        console.log(err);
    })
}

exports.getDishes =  (req,res,next) => {
    req.user.getDishes()
    // Dish.findAll()
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

     Dish.findByPk(dishId).then((dish) => {
         return dish.destroy();
     }).then(result => {
         console.log('destroyed dish');
         res.redirect('/');
     }).catch((err) => {
         console.log(err);
     });
 }

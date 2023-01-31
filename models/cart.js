const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(require.main.filename),'data','cart.json');

module.exports = class Cart{
        
    static addDish(id, dishPrice) {
        let cart = {dishes:[], totalCartPrice: 0};
        fs.readFile(p, (err,fileContent) => {
            if(!err){
                cart = JSON.parse(fileContent);
            }
            let existingDishIndex = cart.dishes.findIndex(dish => dish.id == id);
            let existingDish = cart.dishes[existingDishIndex];
            let updatedDish;
            console.log('LKLKLKLKLKLKLKLKLLKLK');
            console.log(existingDishIndex);
            console.log(id);
            console.log(cart.dishes);
            if(existingDish){
                updatedDish = {...existingDish};
                updatedDish.qty = updatedDish.qty+1;
                cart.dishes = [...cart.dishes];
                cart.dishes[existingDishIndex] =  updatedDish;
            } else {
                updatedDish = { id: id, qty: 1};
                cart.dishes = [...cart.dishes, updatedDish];
            }
            cart.totalCartPrice = cart.totalCartPrice + +dishPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if(err){
                    console.log(err);
                }
            });
        });

    }
};
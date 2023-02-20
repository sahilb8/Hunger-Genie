const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                dishId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Dish',
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            }
        ]
    }
});

userSchema.methods.addToCart = function(dish) {
        const cartDishIndex = this.cart.items.findIndex((cp) => {
            console.log(cp.dishId.toString() === dish._id.toString());
            return cp.dishId.toString() === dish._id.toString();
        });


        const updatedCartItems = [...this.cart.items];
        let newQuantity = 1;
        if(cartDishIndex >= 0) {
            newQuantity = this.cart.items[cartDishIndex].quantity + 1;
            updatedCartItems[cartDishIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({dishId : dish._id, quantity : 1});
        }
        
        const updatedCart = {
            items : updatedCartItems
        };
        this.cart = updatedCart;
        return this.save();
};

userSchema.methods.postCartDeleteDish = function(dishId) {
    const updatedCartItems = this.cart.items.filter(dish => {
        return dish.dishId.toString() !== dishId.toString();
    });

    this.cart.items = updatedCartItems;
    return this.save();
};

userSchema.methods.clearCart = function() {
    this.cart.items = [];
    return this.save();
}


module.exports = mongoose.model('User', userSchema);

// const req = require('express/lib/request');
// const mongodb  = require('mongodb');
// const getDb = require('../utils/database').getDb;

// class User {
//     constructor(name, email, cart, id) {
//         this.name = name;
//         this.email = email;
//         this.cart = cart;
//         this._id = id;
//     }\

//     save() {
//         const db = getDb();
//         return db.collection('users').insertOne(this);
//     }

//     addToCart(dish) {
//         const db = getDb();
//         const cartDishIndex = this.cart.items.findIndex((cp) => {
//             console.log(cp.dishId.toString() === dish._id.toString());
//             return cp.dishId.toString() === dish._id.toString();
//         });


//         const updatedCartItems = [...this.cart.items];
//         let newQuantity = 1;
//         if(cartDishIndex >= 0) {
//             newQuantity = this.cart.items[cartDishIndex].quantity + 1;
//             updatedCartItems[cartDishIndex].quantity = newQuantity;
//         } else {
//             updatedCartItems.push({dishId : new mongodb.ObjectId(dish._id), quantity : 1});
//         }
        
//         const updatedCart = {
//             items : updatedCartItems
//         };
//         return db.collection('users')
//         .updateOne(
//             {_id: new mongodb.ObjectId(this._id)},
//             { $set : {cart : updatedCart}}
//         );
//     }

//     postCartDeleteDish(dishId) {
//         const db = getDb();
//         const updatedCartItems = this.cart.items.filter(dish => {
//             return dish.dishId.toString() !== dishId.toString();
//         });
//         return db.collection('users')
//         .updateOne(
//             {_id: new mongodb.ObjectId(this._id)},
//             { $set : {cart : {items : updatedCartItems}}}
//         );

//     }

//     addOrder() {
//         const db = getDb()
//         return this.getCart()
//         .then(dishes => {
//             const order = {
//                 items : dishes,
//                 user : {
//                     _id : this._id,
//                     name : this.name,
//                 }
//             }
//             return db.collection('orders')
//             .insertOne(order)
//             .then(result => {
//                 this.cart =  {items: []}
//                 return db.collection('users')
//                         .updateOne(
//                             {_id: new mongodb.ObjectId(this._id)},
//                             { $set : {cart : this.cart}}
//                         );
//             })
//         })
//         .catch(err => console.log(err));
//     }

//     getCart() {
//         const db = getDb();
//         const dishIdList = this.cart.items.map(d => {
//             return d.dishId;
//         })
//         return db.collection('dishes')
//         .find({_id : {$in : dishIdList}})
//         .toArray()
//         .then(dishes => {
//             return dishes.map(d => {
//                 return {
//                     ...d,
//                     quantity : this.cart.items.find(i => {
//                         return i.dishId.toString() === d._id.toString();
//                     }).quantity
//                 };
//             });
//         })
//         .catch(err => console.log(err));
//     }

//     getOrders() {
//         const db = getDb();
//         return db.collection('orders')
//         .find({'user._id': new mongodb.ObjectId(this._id)})
//         .toArray()
//         .then(orders => {
//             return orders;
//         })
//         .catch(err => console.log(err));
//     }

//     static findById(userId) {
//         const db = getDb();
//         return db.collection('users')
//         .find({_id : new mongodb.ObjectId(userId)})
//         .toArray()
//         .then(users => {
//             console.log('users found: ' + users);
//             return users[0];
//         })
//         .catch(err => console.log(err));
//     }
// }

// module.exports = User;
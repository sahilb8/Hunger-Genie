const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

class Dish {
    constructor(title, price, imageUrl, description, id, userId) {
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dbOp;
        console.log('LKLKLKLKLKLKLKLKLKLKLKL');
        console.log(this);
        if(this._id){
            dbOp = db.collection('dishes').updateOne({_id : this._id}, {$set: this});
        } else {
            dbOp = db.collection('dishes').insertOne(this);
        }
        return dbOp.then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('dishes')
        .find()
        .toArray()
        .then(dishes => {
            console.log(dishes);
            return dishes;
        })
        .catch(err => {
            console.log(err);
        });
    }

    static findById(dishId) {
        const db = getDb();
        return db.collection('dishes')
        .find({_id : new mongodb.ObjectId(dishId)})
        .next()
        .then(dish => {
            console.log(dish);
            return dish;
        })
        .catch(err => {
            console.log(err);
        });
    }

    static deleteById(dishId) {
        const db = getDb();
        return db.collection('dishes')
        .deleteOne({_id : new mongodb.ObjectId(dishId)})
        .then(dish => {
            console.log(dish);
            return dish;
        })
        .catch(err => {
            console.log(err);
        });
    }
}

// const Sequelize = require('sequelize');

// const sequelize = require('../utils/database');

// const Dish = sequelize.define('dish',{
//     id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     title: Sequelize.STRING,
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false,
//     },
//     imageUrl: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     }
// });


module.exports = Dish;
const db = require('../utils/database');

module.exports = class Dish {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    };

    save(){
       return db.execute('INSERT INTO dishes(title,price,description,imageUrl) VALUES(?,?,?,?)',
        [this.title,this.price,this.description,this.imageUrl]);
    }

    static fetchAll(){
        return db.execute('SELECT * FROM dishes');
    }

    static fetchDishById(id) {
        return db.execute('SELECT * FROM dishes where dishes.id = ?', [id]);
    }
};
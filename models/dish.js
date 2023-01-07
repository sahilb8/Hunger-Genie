const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(require.main.filename),'data','products.json');

const getContentOnFileRead = cb => {
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            console.log(err);
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    
    });
}

module.exports = class Dish {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    };

    save(){
        getContentOnFileRead((dishes) => {
            dishes.push(this);
            fs.writeFile(p,JSON.stringify(dishes),(err)=>{
                if(err){
                    console.log(err);
                }
            });
        })
    }

    static fetchAll(cb){
        getContentOnFileRead(cb);
    }
};
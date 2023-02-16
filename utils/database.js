const mongodb  = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb://127.0.0.1:27017/'
    )
    .then(client => {
        _db = client.db('hunger_genie');
        console.log('connected');
        callback()
    })
    .catch(err => console.log(err));
};

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database connection found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
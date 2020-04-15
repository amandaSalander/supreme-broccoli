const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


// Database uri
const uri = 'mongodb://localhost:27017'

// Database name
const database_name = 'goodreads';
let _client
let _db

const connectDB = async (callback) => {
     try {
         MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
             _db = client.db(database_name);
             _client = client
             return callback(err)
         })
     } catch (e) {
         throw e
     }
}

 const getDB = () => _db

 const disconnectDB = () => _client.close()

 module.exports = { connectDB, getDB, disconnectDB }
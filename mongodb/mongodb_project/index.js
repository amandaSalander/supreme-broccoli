 // Load MongoDB utils
 const MongoDB = require('./mongodb');


 MongoDB.connectDB(async(err)=>{
    if (err) throw err;

    console.log('Connected to DB, YAY !');

    const db = MongoDB.getDB();

    const books = db.collection('books');

    let author_name = "Collins";
    getBookByAuthorName(books,author_name)
    .then(res=>{
       console.log(res);
    })
    .catch(err=>{
       console.log(err);
    });

 })


const getBooksByQuery= async (collection,query)=>{
   return collection.findOne(query);
}

const getBookByAuthorName = (collection,name) =>{
   return getBooksByQuery(collection,{'authors':{$regex:name,$options:'i'}});
};
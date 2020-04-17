const   express = require('express'),
        MongoDB = require('./mongodb');

let tagsRouter = require('./routes/tags');
let booksRouter = require('./routes/books')


MongoDB.connectDB(async(err)=>{
    if (err) throw err;

    // create an express application
    const app= express();
    // define port number to 3000
    const port_id=3000;

    console.log('Connected to DB, YAY !');

    const db = MongoDB.getDB();

    const booksCollection = db.collection('books');

    const tagsCollection = db.collection('tags');

    tagsRouter.setTagsCollection(tagsCollection);
    booksRouter.setBooksCollection(booksCollection);

    // Routes HTTP GET requests to the specified path "/"
    // with the specified callback function
    app.get('/', function(req, res) {
        res.send('Hello, World!');
    })
    // Import my tags routes into the path '/tags'
    .use('/tags', tagsRouter.router)
    // Import my books routes into the path '/books'
    .use('/books',booksRouter.router);

    app.listen(port_id,()=>{
        console.log('Server listening on http://localhost:'+port_id);
    })
})




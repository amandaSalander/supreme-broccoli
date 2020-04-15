const   express = require('express'),
        MongoDB = require('./mongodb'),
        queries = require('./queries'),
        http= require('http'),
        utils = require('./utils');

// create an express application
const app= express();
// define port number to 3000
const port_id=3000;


MongoDB.connectDB(async(err)=>{
    if (err) throw err;

    console.log('Connected to DB, YAY !');

    const db = MongoDB.getDB();

    const books = db.collection('books');

    // Routes HTTP GET requests to the specified path "/"
    // with the specified callback function
    app.get('/', function(req, res) {
        res.send('Hello, World!');
    });

    /**
     * Get one book by author name unordered
     */
    app.get('/book_by_author_name/:author_name', function(req,res){
        let author_name =  req.params.author_name;
        queries.getBookByAuthorName(books,author_name)
        .then(data=>{
            if (data) res.send(data);
            else res.send(http.STATUS_CODES[404]);
         })
         .catch(err=>{
            res.send(http.STATUS_CODES[500]);
         });
    });

    /**
     * Get books by author name ordered
     */
    app.get('/books_by_author_name/:author_name', function(req,res){
        let author_name =  req.params.author_name;
        queries.getBooksByAuthorName(books,author_name)
        .toArray()
        .then(data=>{
            if (data) res.send(data);
            else res.send(http.STATUS_CODES[404]);
         })
         .catch(err=>{
            res.send(http.STATUS_CODES[500]);
         });
    });

    app.get('/book_by_id/:id',(function(req,res){
        let book_id = utils.TryParseInt(req.params.id,null);

        if (book_id) {
            queries.getBookByID(books,book_id)
            .then(data=>{
                if (data) res.send(data);
                else res.send(http.STATUS_CODES[404]);
            })
            .catch(err=>{
                res.send(http.STATUS_CODES[500]);
            });
        }
        else {
            res.send(http.STATUS_CODES[404]);
        }
    }));

    /**
     * Get book by isbn code, return error if
     * the isbn is not a perfect match
     */
    app.get('/book_by_isbn/:id',(req,res)=>{
        let book_isbn = utils.TryParseInt(req.params.id,null);

        if (book_isbn) {
            queries.getBookByIsbn(books,book_isbn)
            .then(data=>{
                if (data) res.send(data);
                else res.send(http.STATUS_CODES[404]);
            })
            .catch(err=>{
                res.send(http.STATUS_CODES[500]);
            });
        }
        else {
            res.send(http.STATUS_CODES[404]);
        }
    })

    /**
     * Get one book by title, returns book
     * if match in sub-string found
     */
    app.get('/book_by_title/:title',(req,res)=>{
        let book_title = req.params.title;

        if (book_title) {
            queries.getBookByTitle(books,book_title)
            .then(data=>{
                if (data) res.send(data);
                else res.send(http.STATUS_CODES[404]);
            })
            .catch(err=>{
                res.send(http.STATUS_CODES[500]);
            });
        }
        else {
            res.send(http.STATUS_CODES[404]);
        }
    })

    /**
     * Get books by title, returns book
     * if match in sub-string found
     */
    app.get('/books_by_title/:title',(req,res)=>{
        let book_title = req.params.title;

        if (book_title) {
            queries.getBooksByTitle(books,book_title)
            .toArray()
            .then(data=>{
                if (data) res.send(data);
                else res.send(http.STATUS_CODES[404]);
                console.log(data);
            })
            .catch(err=>{
                res.send(http.STATUS_CODES[500]);
            });
        }
        else {
            res.send(http.STATUS_CODES[404]);
        }
    })

})



app.listen(port_id,()=>{
    console.log('Server listening on http://localhost:'+port_id);
})
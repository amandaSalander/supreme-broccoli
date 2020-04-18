var express = require('express'),
    router = express.Router(),
    utils = require('../utils')
    http = require('http'),
    queries = require('../queries');


let _booksCollection

const setBooksCollection = (collection)=>{ _booksCollection = collection;}


router
  // Add a binding to handle '/books'
  .get('/', function(req,res){
    // render the /tags view
    res.send("Hello Home of Books !");
  })


/**
 * Get one book by author name unordered
 * */
router
    .get('/author_name_one/:author_name', function(req,res){
        let author_name =  req.params.author_name;
        if (_booksCollection && author_name){
            queries.getBookByAuthorName(_booksCollection,author_name)
            .then(data=>{
                if (data) res.send(data);
                else res.send(http.STATUS_CODES[404]);
            })
            .catch(err=>{
                res.send(http.STATUS_CODES[500]);
            });
        }
    });


/**
* Get books by author name ordered
*/
router
    .get('/author_name/:author_name', function(req,res){
        let author_name =  req.params.author_name;
        if (_booksCollection && author_name){
            queries.getBooksByAuthorName(_booksCollection,author_name)
            .toArray()
            .then(data=>{
                if (data) res.send(data);
                else res.send(http.STATUS_CODES[404]);
            })
            .catch(err=>{
                res.send(http.STATUS_CODES[500]);
            });
        }
    });

/**
* Get books by id
*/
router
    .get('/id/:id',(function(req,res){
    let book_id = utils.TryParseInt(req.params.id,null);

    if (_booksCollection && book_id) {
        queries.getBookByID(_booksCollection,book_id)
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
 * Get one book by title, returns book
 * if match in sub-string found
 */
router
    .get('/title_one/:title',(req,res)=>{
        let book_title = req.params.title;

        if (_booksCollection && book_title) {
            queries.getBookByTitle(_booksCollection,book_title)
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
router
    .get('/title/:title',(req,res)=>{
        let book_title = req.params.title;

        if (_booksCollection && book_title) {
            queries.getBooksByTitle(_booksCollection,book_title)
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

/**
* Get book by isbn code, return error if
* the isbn is not a perfect match
*/
router
    .get('/isbn/:id',(req,res)=>{
        let book_isbn = utils.TryParseInt(req.params.id,null);

        if (_booksCollection && book_isbn) {
            queries.getBookByIsbn(_booksCollection,book_isbn)
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
* Get book by isbn13 code, return error if
* the isbn is not a perfect match
*/
router
    .get('/isbn13/:id',(req,res)=>{
        let book_isbn13 = utils.TryParseInt(req.params.id,null);

        if (_booksCollection && book_isbn) {
            queries.getBookByIsbn13(_booksCollection,book_isbn13)
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
 * Get book tags by book_id
 *  example http://localhost:3000/books/3/tags
*/
router
    .get('/:book_id/tags',(req,res)=>{
        let book_id = utils.TryParseInt(req.params.book_id,null);

        if (_booksCollection && book_id) {
            queries.getBooksTags(_booksCollection,book_id)
            .toArray()
            .then(data=>{
                if (data) res.send(data);
                else res.send(http.STATUS_CODES[404]);
            })
            .catch(err=>{
                res.send(http.STATUS_CODES[500]);
            });
        }
    })

module.exports = {router, setBooksCollection};
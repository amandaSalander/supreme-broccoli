const getBooksByQuery= (collection,query)=>{
    return collection.findOne(query);
};


const getBookByAuthorName = (collection,name) =>{
    return collection.findOne({'authors':{$regex:name,$options:'i'}});
};

const getBooksByAuthorName = (collection,name) =>{
    return collection.find({
        $query:{'authors':{$regex:name,$options:'i'}},
        $order:{'authors':1}
    });
};

const getBookByID = (collection,id) =>{
    return collection.findOne({'book_id':id});
};

const getBookByIsbn = (collection,isbn) =>{
    return collection.findOne({'isbn':isbn});
};

const getBookByIsbn13 = (collection,isbn13) =>{
    return collection.findOne({'isbn13':isbn13});
};


const getBookByTitle = (collection,title)=>{
    return collection.findOne({'title':{$regex:title,$options:'i'}});
}

const getBooksByTitle = (collection,title)=>{
    return collection.find({
        $query:{'title':{$regex:title,$options:'i'}},
        $order:{'title':1}
    });
}

const getTagById = (collection,id)=>{
    return collection.findOne({"tag_id":id});
}

const getTagsByName = (collection,tagName)=>{
    return collection.find({
        $query:{"tag_name":{$regex:tagName,$options:'i'}},
        $order:{"tag_name":1}
    });
}

const getBooksTags = (collection,book_id)=>{
    return collection.aggregate([
        {
            $match:{
                "book_id":book_id
            }
        },
        { $lookup:
            {
                from:"books_tags",
                localField: "book_id",
                foreignField: "goodreads_book_id",
                as:"book_tags"
            }
        },
        { $project:{
                "book_tags":1
            }
        },
        { $unwind:"$book_tags"},
        { $lookup:{
                from:"tags",
                localField: "book_tags.tag_id",
                foreignField: "tag_id",
                as:"tags_name"
            }
        },
        { $project:{
                "tag_id":"$book_tags.tag_id",
                "tag_count":"$book_tags.count",
                "tags_name" : 1,
                "_id":0
            }
        },
        { $unwind:"$tags_name"},
        { $project:{
                "tag_id":1,
                "tag_count":1,
                "tags_name" : "$tags_name.tag_name"
            }
        }
    ]);
}

module.exports = {
    getBookByAuthorName,
    getBooksByAuthorName,
    getBookByID,
    getBookByIsbn,
    getBookByIsbn13,
    getBookByTitle,
    getBooksByTitle,
    getTagById,
    getTagsByName,
    getBooksTags
};
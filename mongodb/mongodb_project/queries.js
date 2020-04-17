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

module.exports = {
    getBookByAuthorName,
    getBooksByAuthorName,
    getBookByID,
    getBookByIsbn,
    getBookByIsbn13,
    getBookByTitle,
    getBooksByTitle,
    getTagById,
    getTagsByName
};
var express = require('express'),
    router = express.Router(),
    utils = require('../utils')
    http = require('http'),
    queries = require('../queries');

var automatedRoutes = require('../tagsRoutes/automated');

let _tagsCollection;

const setTagsCollection = (collection)=>{ _tagsCollection= collection;}

router
  // Add a binding to handle '/tags'
  .get('/', function(req,res){
    // render the /tags view
    res.send("Tags !!!");
  })

  // Import my automated routes into the path '/tags/automated'
  // This works because we're already within the '/tags' route so we're simply appending more routes to the '/tags' endpoint
  .use('/automated', automatedRoutes);

/**
 * Handle query of tag searcg by id */
router
  .get('/id/:id',(req,res)=>{
    let tag_id = utils.TryParseInt(req.params.id,null);
    if (_tagsCollection && tag_id){

      queries.getTagById(_tagsCollection,tag_id)
      .then(data=>{
        if (data) res.send(data);
        else res.send(http.STATUS_CODES[404]);
      })
      .catch(err=>{
        res.send(http.STATUS_CODES[500]);
      });
    }
  })

/**
 * handle query of tag search by tag name
 */
router
  .get('/name/:tag_name',(req,res)=>{
    let tagName = req.params.tag_name;
    if (_tagsCollection && tagName){

      queries.getTagsByName(_tagsCollection,tagName)
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



module.exports = {router, setTagsCollection};
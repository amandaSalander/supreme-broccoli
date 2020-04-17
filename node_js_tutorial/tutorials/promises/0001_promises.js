const fs = require('fs');

function readJSON(filename,enc, callback){
    fs.readFile(filename, enc, function (err, res){
      if (err) return callback(err);
      try {
        res = JSON.parse(res);
      } catch (ex) {
        return callback(ex);
      }
      callback(null, res);
    });
  }

filename = './example/example.json'
enc = 'utf-8'
readJSON(filename,enc,(err,res)=>{
    if(err) throw err;
    console.log(res);
});
const fs = require('fs');

function readJSON(filename, enc){
    return new Promise( (fulfill, reject)=>{
      fs.readFile(filename, enc, (err, res)=>{
        if (err) reject(err);
        else {
            try {
                res = JSON.parse(res);
                fulfill(res)
            } catch (ex) {
                return reject(ex);
            }
        };
      });
    });
}

filename = './example/example.json'
enc = 'utf-8'
readJSON(filename,enc)
.then(data=>{
    console.log(data);
})
.catch(err=>{
    console.error(err);
});
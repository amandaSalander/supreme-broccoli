const fs = require('fs');

function readFile(filename, enc){
    return new Promise((fulfill, reject)=>{
      fs.readFile(filename, enc, (err, res)=>{
        if (err) reject(err);
        else fulfill(res);
      });
    });
}

function readJSON(filename){
    return new Promise((fulfill,reject)=>{
        readFile(filename,'utf-8')
        .then(res=>{
            try{
                fulfill(JSON.parse(res));
            }catch(ex){
                reject(ex);
            }
        },reject);
    })
}

filename = './example/example.json'

readJSON(filename)
.then(data=>{
    console.log(data);
})
.catch(err=>{
    console.error(err);
});

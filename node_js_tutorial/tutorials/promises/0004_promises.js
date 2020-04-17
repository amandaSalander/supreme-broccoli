const fs = require('fs');

function readFile(filename, enc){
    return new Promise((fulfill, reject)=>{
      fs.readFile(filename, enc, (err, res)=>{
        if (err) reject(err);
        else fulfill(res);
      });
    });
}

enc = 'utf-8';

Promise.all(
    [
        readFile('./example/file_1.txt',enc),
        readFile('./example/file_2.txt',enc),
        readFile('./example/file_3.txt',enc),
    ]
)
.then(res=>{
    console.log(res);
})
.catch(err=>{
    console.error(err);
})


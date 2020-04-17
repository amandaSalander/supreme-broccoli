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


const promise1 = new Promise((resolve,reject)=>{
    setTimeout(resolve, 500, readFile('./example/file_1.txt',enc));
})

const promise2 = new Promise((resolve,reject)=>{
    setTimeout(resolve, 100, readFile('./example/file_2.txt',enc));
})

Promise.race([promise1, promise2]).then(function(value) {
    console.log(value);
    // Both resolve, but promise2 is faster
});


const promise3 = new Promise((resolve,reject)=>{
    setTimeout(resolve, 150, readFile('./example/file_1.txt',enc));
})

const promise4 = new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error('Fail')), 100);
});

Promise.race([promise3, promise4])
.then((value)=> {})
.catch((err)=>{console.log(err);
});
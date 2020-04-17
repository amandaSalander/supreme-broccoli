# Promises

## Introduction

In async and generators tutorial, we talked about how to use callback functions for handling asynchronous event.
And especially how to avoid them when they are too much nested in the code by using generators.

In this tutorials, you will know what are promises in NodeJS and how to use them to handle asynchornous events.

## What is a promise ?

The core idea behind promises is that a promise represents the result of an asynchronous operation. A promise is in one of three different states:

* pending - The initial state of a promise.
* fulfilled - The state of a promise representing a successful operation.
* rejected - The state of a promise representing a failed operation.

It is "a kind of enhancement of callback". Instead of waiting for the asynchronous work to finish with callbacks, we give a promise that the asynchronous work will be done (pending). By done we mean that the promise will then either be fulfilled or rejected, like in real life !


## Example

To read a json file using callbacks we do this:
```JS
const fs = require('fs');

function readJSON(filename, callback){
    fs.readFile(filename, 'utf8', function (err, res){
      if (err) return callback(err);
      try {
        res = JSON.parse(res);
      } catch (ex) {
        return callback(ex);
      }
      callback(null, res);
    });
  }
```

To use the readJSON function
```JS
filename = './example/example.json'
readJSON(filename,(err,res)=>{
    if(err) throw err;
    console.log(res);
});
```
You can find the example in 0001_promises.js

The code of readJSON in rather messy using callbacks. The code is rather eerie when we talk about error handling and the fact that we are still using the extra callback parameters. But luckily for us we can use Promises to make the code cleaner, more readable and simplify error handling.


The code of the readJSON with promises would be

```JS
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
```

To execute the function readJSON

```JS
filename = './example/example.json'
enc = 'utf-8'
readJSON(filename,enc)
.then(data=>{
    console.log(data);
})
.catch(err=>{
    console.error(err);
});
```

You can find the code in 0002_promises.js

Even if we used promises, we still don't handle the parse to json error separately from the error of reading file. It would be much better to split the readJSON function into two functions. One that handle the read of a general file and the other get the result and do the parsing.

For example, taking this into account the readFile function would be

```JS
const fs = require('fs');

function readFile(filename, enc){
    return new Promise((fulfill, reject)=>{
      fs.readFile(filename, enc, (err, res)=>{
        if (err) reject(err);
        else fulfill(res);
      });
    });
}
```

And the readJSON would be

```JS
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
```

To execute the function readJSON

```JS
filename = './example/example.json'

readJSON(filename)
.then(data=>{
    console.log(data);
})
.catch(err=>{
    console.error(err);
});
```
You can find the code at 0003_promises.js

## Promise documentation

The specification of Promises can be found here [ECMAScript (ECMA-262)](https://tc39.es/ecma262/#sec-promise.all). You can also find the documentation of how to use Promise at [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

### **Promise.all** Multiple Promises to handle when all fullfilled

The **Promise.all()** returns a single Promise when all of the promises passed as an interable have been fullfilled. It rejects when a promise is rejected.

It is typically used when multiple asynchronous task  run concurrently so that one can wait for all the tasks to be finished to get all their results at once.


**Example**

We reuse the function readFile of 0003_promises.js

```JS
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
```

when running the code you will obtain in terminal

```
[ 'Hello world !',
  'I am waiting for my promise',
  'a Potato and a Snail story.' ]
```

try to change one of the file path to be incorrect, you will trigger the execution of the catch, the result would be
```
{ Error: ENOENT: no such file or directory, open './example/file.txt'
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: './example/file.txt' }
```

You can find the code in 0004_promises.js
for more details feel free to read the documentation in this [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)


### **Promise.resolve()**

Returns a promise object that is resolved with a given value.

```JS
Promise.resolve('Success').then(function(value) {
    console.log(value); // "Success"
  }, function(value) {
    // not called
  });
```

### **Promise.reject(reason)**

Returns a Promise object that is rejected with a reason.

```JS
Promise.reject(new Error('fail')).then(
    (res)=>{
        console.log('Resolved');
    },
    (err)=>{
        console.error(err);
    });
// expected output: Error: fail
```

### **Promise.race()**

Method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise. [MDN web docs] [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

**Example 1** resolve

```JS
const promise1 = new Promise((resolve,reject)=>{
    setTimeout(resolve, 500, readFile('./example/file_1.txt',enc));
})

const promise2 = new Promise((resolve,reject)=>{
    setTimeout(resolve, 100, readFile('./example/file_2.txt',enc));
})
```

We create two promises, the first reslove after 500ms and the second ater 100ms.

we use Promise.race to get the first Promise that resolve like this
```JS
Promise.race([promise1, promise2]).then(function(value) {
    console.log(value);
    // Both resolve, but promise2 is faster
});
```

**Example 2** reject

```JS
const promise3 = new Promise((resolve,reject)=>{
    setTimeout(resolve, 150, readFile('./example/file_1.txt',enc));
})

const promise4 = new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error('Fail')), 100);
});

```
The promise3 resolve after 150ms but the promise4 reject before at 100ms

with Promise.race() we will get a reject
```JS
Promise.race([promise3, promise4])
.then((value)=> {})
.catch((err)=>{console.log(err);
});
```

You can find the code at 0005_promises.js
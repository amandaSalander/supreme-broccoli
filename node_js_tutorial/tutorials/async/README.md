# Async

## Introduction

Javascript is asynchronous by nature so Node si naturally too. Asynchronous is a design pattern which ensure the non-blocking code execution.

more precisely:

In multithreaded computer programming, asynchronous method invocation (AMI), also known as asynchronous method calls or the asynchronous pattern is a design pattern in which the call site is not blocked while waiting for the called code to finish. Instead, the calling thread is notified when the reply arrives. Polling for a reply is an undesired option. [Wikipedia https://en.wikipedia.org/wiki/Asynchronous_method_invocation]


Asynchronous programming is great for faster execution of programs but it comes with price. That’s right, its tideous to program and most of the time we end up having callback hell scenario.

the code in 001_async.js is a sync one, where each instruction is blocking

the result of 001_async.js execution

![SYNC CODE WITH FS](/assets/images/00009_async_sync_example.png)

in the example 002_async.js, we use a callback function, when reading the file
the second console.log is read before the execution of the callback
which is the proof that the readFile is non-blocking in this case.

![ASYNC CODE WITH FS](/assets/images/00010_async_callback_fs.png)

## Callback hell
we just used callback to make our code async, when you use too much nested callback (deeply nest async function) you become evil !

Let me explain:

“Callback Hell” is a JavaScript anti-pattern caused by deeply nesting asynchronous functions. Async is nice but you have to handle it correctly

An asynchronous function is one where some external activity must complete before a result can be processed; it is “asynchronous” in the sense that there is an unpredictable amount of time before a result becomes available. Such functions require a callback function to handle errors and process the result.

An example of an asynchronous function is the NodeJS `fs.readFile(path, callback)` function which reads a file from a file system path and, once a result becomes available, processes the result using a callback function.

you can found the code at 0003_async.js
```JS
    const fs = require('fs')
    // require module file system
    const filePath =  'testfile.txt'
    fs.readFile(filePath, (err, data) => {
    if (err) throw err
    console.log(data.toString())
    });
```

In this example, the contents of `filePath` will be retrieved from the local file system, the results of which will be passed to the callback function :
```JS
    (err, data) => {
    if (err) throw err
    console.log(data.toString())
    }
```

if we suppose that we want to retrieve the content of two files and then concatenate them, one might do this :

```JS
    const fs = require('fs')
    const filePath1 = 'testfile.txt'
    const filePath2 = 'testfile_1.txt'

    fs.readFile(filePath1, (err, data1) => {
        if (err) throw err
        fs.readFile(filePath2, (err, data2) => {
        if (err) throw err
        const result = `${data1.toString()}\n${data2.toString()}`;
        console.log(result)
        });
    });
```

in this case, you may notice that an error in fetching the filepath1 causes an error in fetching the second file. Try to change the filepath to non valid one and you will notice the problem.
The best solution is to fetch each file separately and then concatenate the result

If we suppose that a guy in an application needs to fetch five or more files. That one guy might actually be stupid enough to do:
```JS
    const fs = require('fs') // require the standard NodeJS fs module
    const filePath1 = './some/local/file1'
    const filePath2 = './some/local/file2'
    const filePath3 = './some/local/file3'
    const filePath4 = './some/local/file4'
    const filePath5 = './some/local/file5'
    // helper function to concatenate results into a single string
    const concatFiles = (...data) => {
      return data
        .map((res) => res.toString())
        .join('\n')
    }
    fs.readFile(filePath1, (err, data1) => {
      if (err) throw err
      fs.readFile(filePath2, (err, data2) => {
        if (err) throw err
        fs.readFile(filePath3, (err, data3) => {
          if (err) throw err
          fs.readFile(filePath4, (err, data4) => {
            if (err) throw err
            fs.readFile(filePath5, (err, data5) => {
              if (err) throw err
              console.log(
                concatFiles(data1, data2, data3, data4, data5)
              )
            })
          })
        })
      })
    })
```

So this is what we call a callback hell.

One with a brain sufficient enought would do this:

```JS
    const fs = require('fs') // require the standard NodeJS fs module
    const filePaths = [
    'testfile.txt',
    'testfile.txt',
    'testfile.txt',
    'testfile.txt',
    'testfile.txt'
    ]
    const contents = [] // storage for contents of files

    /**
     * Processes the results of calling fs.readFile.
     *
     * @param  {Error} [err]      - from call to fs.readFile
     * @param  {Buffer} [data=''] - returned from call to fs.readFile
     * @return {null}
     *
     * @throws Exception
     */
    const processResult = (err, data = '') => {
    if (err) throw err
    contents.push(data.toString())
    if (filePaths.length) { // there are still filePaths to process
        // if so, handle the next filePath
        fs.readFile(filePaths.shift(), processResult)
    } else {
        // or print the results!
        console.log(contents.join('\n'))
    }
    }

    // process the files
    fs.readFile(filePaths.shift(), processResult)
```

you can find the code at 0005_async.js

Thi way the code is more clean but in fact it does not handle the file fetching in any order. It's up to you to do the rest ;)

## How to avoid Callback Hell ?

to avoid callback hell use one or the combination of the following:

* Modularise your code;
* Use generators;
* Use promises;
* Use event-driven programming;
* Use Async.js.

### Modularise your code

from this:
```JS
var fs = require("fs");
fs.readFile('async.js','utf8',function(err,data){
    if(!err) {
       console.log(data);
    }
});
```
to :
```JS
var fs = require("fs");

fs.readFile('async.js','utf8',fileContent);

function fileContent(err,data) {
  if(!err) {
     console.log(data);
  }
}
```

In this case, you will not see the necessity to name the function but in a growing code, it's important to keep the code clear and please try to as declarative as possible.
the best code is the code that we skim through not the one that we read entirely the first time.

### Use generators

To be simple, generator in this case help you pass from async to sync code.

before using generator
```JS
var fs = require("fs");
fs.readFile('testfile.txt','utf8',function(err,data){
    if(!err) {
       console.log(data);
    }
});
console.log("something else");
```
after

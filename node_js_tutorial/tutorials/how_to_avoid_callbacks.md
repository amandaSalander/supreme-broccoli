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
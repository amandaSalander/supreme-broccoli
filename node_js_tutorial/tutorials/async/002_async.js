var fs = require("fs");

fs.readFile('testfile.txt','utf8',function(err,data){
    if(!err) {
       console.log(data);
    }
});
console.log("If you read this before the phone call,it is the proof ... better read it what comes next!");
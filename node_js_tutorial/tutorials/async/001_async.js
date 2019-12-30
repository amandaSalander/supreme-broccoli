// load fs system module
var fs = require("fs");

//  Reading file content the use console.log to print the message
// to the terminal

var fileContent = fs.readFileSync('testfile.txt','utf8');
console.log("Logging last recieved call");
console.log("**************************");
console.log("START");
console.log(fileContent);
console.log("END");
console.log("If you read this after the phone call,it is the proof that the snail ate the Potato synchronously");
console.log("**************************");

// In this example the code execution is sync
// see 002_async.js for async code
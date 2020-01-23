"use strict";
var fs = require('fs');
var co = require('co');

co(function* () {
  var file1 = yield readFile('demo.js');
  console.log(file1);
  console.log("I am after file read even though its Async");
});

function readFile(filename) {
  return function(callback) {
    fs.readFile(filename, 'utf8', callback);
  };
}
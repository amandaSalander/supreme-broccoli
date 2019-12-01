// Throws with a ReferenceError because z is not defined.
try {
    const m = 1;
    const n = m + z;
  } catch (err) {
    // Handle the error here.
    console.error('2 lines of code and you managed to make the code not run ?',err)
}


// Asynchrnous APIs
// Most asynchronous methods that accept a callback function
// will accept an Error object passed as the first argument
// to that function. If that first argument is not null and
// is an instance of Error, then an error occurred that should
// be handled.

const fs = require('fs');
fs.readFile('a file that does not exist', (err, data) => {
  if (err) {
    console.error('There was an error reading the file!', err);
    return;
  }
  // Otherwise handle the data
});

// With EventEmitter
// When an asynchronous method is called on an object that is
// an EventEmitter, errors can be routed to that object's
// 'error' event.

const net = require('net');
const connection = net.connect('localhost');

// Adding an 'error' event handler to a stream:
connection.on('error', (err) => {
  // If the connection is reset by the server, or if it can't
  // connect at all, or on any sort of error encountered by
  // the connection, the error will be sent here.
  console.error(err);
});

connection.pipe(process.stdout);

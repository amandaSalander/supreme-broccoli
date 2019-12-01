const EventEmitter = require('events');

// create a personalized class event emitter that extends
// the EventEmitter class
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// create a callback function that handle the event 'yolo'
myEmitter.on('yolo', () => {
    console.log('an event occurred!');
});

myEmitter.emit('yolo');


// to pass arguments with this

myEmitter.on('this_with_arguments', function(a, b) {
    console.log(a, b, this, this === myEmitter);
    // Prints:
    //   a b MyEmitter {
    //     domain: null,
    //     _events: { event: [Function] },
    //     _eventsCount: 1,
    //     _maxListeners: undefined } true
});
myEmitter.emit('this_with_arguments', 'a', 'b');

// pass arguemnts
myEmitter.on('arguments', function(a, b) {
    console.log(a, b);
});
myEmitter.emit('arguments', 'yolo', 'yokiko');

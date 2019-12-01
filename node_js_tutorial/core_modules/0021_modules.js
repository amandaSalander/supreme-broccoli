const circle = require('./local_modules/circle');
const Square= require('./local_modules/square');

// case of exports of functions
console.log(`The area of a circle of radius 4 is ${circle.area(4)}`);


// case of export of Object/Class
let mySquare = new Square(2);
console.log(`The area of mySquare is ${mySquare.area()}`);



// Folder modules
const Form= require('./local_modules/forms')
mySquare = new Form.Square(2.5);
console.log(`The area of mySquare is ${mySquare.area()}`);
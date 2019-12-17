function helloFromPotato(name) { return `Hello ${name}!`;}

helloFromPotato('Amanda');

const repl = require('repl');
const msg = 'Potato are healthy, creamy and .... crispy !';


//  TODO: uncomment me !
// repl.start('> ').context.m = msg;

//  TODO : comment me to test the above line
const r = repl.start('> ');
Object.defineProperty(r.context, 'm', {
  configurable: false,
  enumerable: true,
  value: msg
});
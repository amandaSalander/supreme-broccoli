var hello = function *(name){
    yield 'Your precious name is '+name;
    return 'Hello '+name+' !';
}

var gen = hello('Potato');
console.log(gen.next());
// Restart the generator with next
console.log(gen.next());
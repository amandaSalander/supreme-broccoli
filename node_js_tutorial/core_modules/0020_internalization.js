const january = new Date(9e8);
const english = new Intl.DateTimeFormat('en', { month: 'long' });
const french = new Intl.DateTimeFormat('fr', { month: 'long' });

console.log(english.format(january).toUpperCase());
// Prints "JANUARY"
console.log(french.format(january).toUpperCase());
// Should print "JANVIER"
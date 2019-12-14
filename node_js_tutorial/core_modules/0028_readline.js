const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// TODO: Uncomment me !
/* rl.question('What do you think of potatos ? ', (answer) => {
    // TODO: Log the answer in a database
    console.log(`Thank you for your valuable feedback: ${answer}`);
    console.log('May the great Potato be with you, always !');

    rl.close();
});
 */
rl.on('line', (input) => {
    console.log(`Received: ${input}`);
});
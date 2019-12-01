const crypto = require('crypto');

const secret = 'sylia_patate';
const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');
console.log(hash);
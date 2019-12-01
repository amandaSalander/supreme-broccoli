const dns = require('dns');

dns.lookup('iana.org', (err, address, family) => {
      console.log('address: %j family: IPv%s', address, family);
});
// address: "192.0.43.8" family: IPv4
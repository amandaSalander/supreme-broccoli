const os = require('os');

// TODO: Uncomment me !
// console.log(os.cpus());

//  Returns an array of objects containing information
// about each logical CPU core.

// The properties included on each object include:

// model <string>
// speed <number> (in MHz)

// times <Object>
//     user <number> The number of milliseconds the CPU has spent
//     in user mode.
//     nice <number> The number of milliseconds the CPU has spent
//     in nice mode.
//     sys <number> The number of milliseconds the CPU has spent
//     in sys mode.
//     idle <number> The number of milliseconds the CPU has spent
//     in idle mode.
//     irq <number> The number of milliseconds the CPU has spent
//     in irq mode.


os.EOL;
// The operating system-specific end-of-line marker.
// \n on POSIX
// \r\n on Windows

console.log(os.arch());


// Contains commonly used operating system-specific constants
//  for error codes, process signals, and so on. The specific
//  constants defined are described in OS Constants.

// TODO: Uncomment me !
// console.log(os.constants)


console.log(os.endianness());
// Returns a string identifying the endianness
//  of the CPU for which the Node.js binary was compiled.
// Possible values are 'BE' for big endian and 'LE' for little endian.

console.log(os.freemem());

// Returns the hostname
console.log(os.hostname());


// Returns: <Object>

/* Returns an object containing network interfaces that
 have been assigned a network address.

Each key on the returned object identifies a network interface.
The associated value is an array of objects that each describe
an assigned network address.

The properties available on the assigned network address
object include:

    address <string> The assigned IPv4 or IPv6 address
    netmask <string> The IPv4 or IPv6 network mask
    family <string> Either IPv4 or IPv6
    mac <string> The MAC address of the network interface
    internal <boolean> true if the network interface is a
        loopback or similar interface that is not remotely accessible;
        otherwise false
    scopeid <number> The numeric IPv6 scope ID (only specified when
        family is IPv6)
    cidr <string> The assigned IPv4 or IPv6 address with the routing
        prefix in CIDR notation. If the netmask is invalid, this property
        is set to null. */

//  TODO: Uncomment me !
// console.log(os.networkInterfaces());

console.log(os.platform());

// Returns the operating system's
// default directory for temporary files as a string.
console.log(os.tmpdir());

console.log(os.type());


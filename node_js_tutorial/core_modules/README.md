## Node core modules

Node.Js is JS built-on Google's V8 engine for Chrome written in c++ that allows to run JS outside the browser. There are numerous modules that extend the Node.Js functionnalities while the engine comme with 37 core modules:
[ 'assert', 'async_hooks',   'buffer',   'c/c++_addons',   'child_process',   'cluster',   'console',   'crypto',   'deprecated_apis',   'dns',   'domain',   'Events',   'fs',   'http',   'http/2', 'https','inspector'  'module',   'net',   'os',   'path',   'performance_timing_api','punycode',   'querystring',   'readline',   'repl',   'stream',   'string_decoder',   'timers',   'tls_(ssl)',   'tracing',   'tty',   'dgram',   'url',   'util',   'v8',   'vm','worker_threads'   'zlib' ]

you can find the list at https://nodejs.org/api/all.json


### assert
The assert module provides a set of assertion functions for verifying invariants. The module provides a recommended strict mode and a more lenient legacy mode. [more at https://nodejs.org/api/assert.html]

```JS
const assert = require('assert');
// Generate an AssertionError to compare the error message later:
const { message } = new assert.AssertionError({
  actual: 1,
  expected: 2,
  operator: 'strictEqual'
});

// Verify error output:
try {
  assert.strictEqual(1, 2);
} catch (err) {
  assert(err instanceof assert.AssertionError);
  assert.strictEqual(err.message, message);
  assert.strictEqual(err.name, 'AssertionError');
  assert.strictEqual(err.actual, 1);
  assert.strictEqual(err.expected, 2);
  assert.strictEqual(err.code, 'ERR_ASSERTION');
  assert.strictEqual(err.operator, 'strictEqual');
  assert.strictEqual(err.generatedMessage, true);
}

```

## Async Hooks
The async_hooks module provides an API to register callbacks tracking the lifetime of asynchronous resources created inside a Node.js application. It can be accessed using:
```JS
    const async_hooks = require('async_hooks');
```
[more details at https://nodejs.org/api/async_hooks.html]

```JS
    const async_hooks = require('async_hooks');

    // Return the ID of the current execution context.
    const eid = async_hooks.executionAsyncId();

    // Return the ID of the handle responsible for triggering the callback of the
    // current execution scope to call.
    const tid = async_hooks.triggerAsyncId();
```

## Buffer
The Buffer class was introduced as part of the Node.js API to enable interaction with octet streams in TCP streams, file system operations, and other contexts.
[more details at https://nodejs.org/api/buffer.html]

## Child Process

The child_process module provides the ability to spawn child processes in a manner that is similar, but not identical, to popen. This capability is primarily provided by the child_process.spawn() function.


## Cluster

A single instance of Node.js runs in a single thread. To take advantage of multi-core systems, the user will sometimes want to launch a cluster of Node.js processes to handle the load.

The cluster module allows easy creation of child processes that all share server ports.

## Command line options
Node.js comes with a variety of CLI options. These options expose built-in debugging, multiple ways to execute scripts, and other helpful runtime options.

To view this documentation as a manual page in a terminal, run man node.
[more details at https://nodejs.org/api/cli.html]

## Console

The console module provides a simple debugging console that is similar to the JavaScript console mechanism provided by web browsers.

The module exports two specific components:

A Console class with methods such as console.log(), console.error() and console.warn() that can be used to write to any Node.js stream.

A global console instance configured to write to process.stdout and process.stderr. The global console can be used without calling require('console').

[more details at https://nodejs.org/api/console.html]

## Crypto

The crypto module provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.

to use crypto just write:
```JS
  const crypto = require('crypto');
```

create the 0009_crypto.js file
then use the following code to test:

```JS
  const secret = 'sylia_patate';
  const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');
  console.log(hash);
```
[more details at https://nodejs.org/api/crypto.html]


## Debugger

Node.js includes an out-of-process debugging utility accessible via a V8 Inspector and built-in debugging client. To use it, start Node.js with the inspect argument followed by the path to the script to debug; a prompt will be displayed indicating successful launch of the debugger:
```
  node inspect 0010_debugger.js
```

Stepping
#

    cont, c - Continue execution
    next, n - Step next
    step, s - Step in
    out, o - Step out
    pause - Pause running code (like pause button in Developer Tools)

[more details at https://nodejs.org/api/debugger.html]

## Deprecated APIs

to find the list of all deprecated APIs.


## DNS

[took from https://nodejs.org/api/dns.html]

The dns module contains functions belonging to two different categories:

Functions that use the underlying operating system facilities to perform name resolution, and that do not necessarily perform any network communication. This category contains only one function: dns.lookup(). Developers looking to perform name resolution in the same way that other applications on the same operating system behave should use dns.lookup().

For example, looking up iana.org.

```JS
    const dns = require('dns');

    dns.lookup('iana.org', (err, address, family) => {
      console.log('address: %j family: IPv%s', address, family);
    });
    // address: "192.0.43.8" family: IPv4
```
for test run the file 0011_dns_1.js

Functions that connect to an actual DNS server to perform name resolution, and that always use the network to perform DNS queries. This category contains all functions in the dns module except dns.lookup(). These functions do not use the same set of configuration files used by dns.lookup() (e.g. /etc/hosts). These functions should be used by developers who do not want to use the underlying operating system's facilities for name resolution, and instead want to always perform DNS queries.

Below is an example that resolves 'archive.org' then reverse resolves the IP addresses that are returned.


```JS
    const dns = require('dns');

    dns.resolve4('archive.org', (err, addresses) => {
      if (err) throw err;

      console.log(`addresses: ${JSON.stringify(addresses)}`);

      addresses.forEach((a) => {
        dns.reverse(a, (err, hostnames) => {
          if (err) {
            throw err;
          }
          console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
        });
      });
    });

```

for test run the file 0011_dns_1.js


## Domain

It is a deprecated module

## ECMAScript modules

ECMAScript modules are the official standard format to package JavaScript code for reuse. Modules are defined using a variety of import and export statements.

The --experimental-modules flag can be used to enable support for ECMAScript modules (ES modules).

## Errors

Applications running in Node.js will generally experience four categories of errors:

  * Standard JavaScript errors such as <EvalError>, <SyntaxError>, <RangeError>, <ReferenceError>, <TypeError>, and <URIError>.
  * System errors triggered by underlying operating system constraints such as attempting to open a file that does not exist or attempting to send data over a closed socket.
  * User-specified errors triggered by application code.
  * AssertionErrors are a special class of error that can be triggered when Node.js detects an exceptional logic violation that should never occur. These are raised typically by the assert module.

Node.js supports several mechanisms for propagating and handling errors that occur while an application is running. How these errors are reported and handled depends entirely on the type of Error and the style of the API that is called.

[took from https://nodejs.org/api/errors.html]

## Events

[took from https://nodejs.org/api/events.html]

Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects (called "emitters") emit named events that cause Function objects ("listeners") to be called.

to use the modules write:
```JS
  const EventEmitter = require('events');
```

to test run the code at 0014_events.js

```JS
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
```

to pass arguments:

```JS
  // pass arguemnts
  myEmitter.on('arguments', function(a, b) {
      console.log(a, b);
  });
  myEmitter.emit('arguments', 'yolo', 'yokiko');
```

to pass this with arguments
```JS
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
```

## File System

[more details at https://nodejs.org/api/fs.html]

The fs module provides an API for interacting with the file system in a manner closely modeled around standard POSIX (Portable Operating System Interface) functions.

to use the modules write:
```JS
  const fs= require('fs');
```


## Globals

These objects are available in all modules. The following variables may appear to be global but are not. They exist only in the scope of modules
* __dirname
* __filename
* exports
* module
* require()

[more details at https://nodejs.org/api/globals.html]

## HTTP

To use the HTTP server and client one must require('http').

The HTTP interfaces in Node.js are designed to support many features of the protocol which have been traditionally difficult to use. In particular, large, possibly chunk-encoded, messages. The interface is careful to never buffer entire requests or responses — the user is able to stream data.

for more details about http please refer to https://nodejs.org/api/http.html and to the 0001_hello_world_http_server.js

## HTTP2

The http2 module provides an implementation of the HTTP/2 protocol.

to use it write:
```JS
  const http2 = require('http2');
```

find code in 0017_http2.js

[more details at https://nodejs.org/api/http2.html]

[ 'assert', 'async_hooks',   'buffer',   'c/c++_addons',   'child_process',   'cluster',   'console',   'crypto',   'deprecated_apis',   'dns',   'domain',   'Events',   'fs',   'http',   'http/2', 'https','inspector'  'module',   'net',   'os',   'path',   'performance_timing_api','punycode',   'querystring',   'readline',   'repl',   'stream',   'string_decoder',   'timers',   'tls_(ssl)',   'tracing',   'tty',   'dgram',   'url',   'util',   'v8',   'vm','worker_threads'   'zlib' ]


## HTTPS

HTTPS is the HTTP protocol over TLS/SSL. In Node.js this is implemented as a separate module.

## Inspector

The inspector module provides an API for interacting with the V8 inspector.

most common example of the inspector is to track CPU performance and
profile the Heap

see code 0019_inspector.js for concrete example

[see also for more details https://chromedevtools.github.io/devtools-protocol/v8]

[and https://nodejs.org/api/inspector.html too]


## Internationalization

Node.js has many features that make it easier to write internationalized programs. Some of them are:

* Locale-sensitive or Unicode-aware functions in the ECMAScript Language Specification:
  * String.prototype.normalize()
  * String.prototype.toLowerCase()
  * String.prototype.toUpperCase()

* All functionality described in the ECMAScript Internationalization API Specification (aka ECMA-402):
  * Intl object
  * Locale-sensitive methods like String.prototype.localeCompare() and Date.prototype.toLocaleString()
* The WHATWG URL parser's internationalized domain names (IDNs) support
* require('buffer').transcode()
* More accurate REPL line editing
* require('util').TextDecoder
* RegExp Unicode Property Escapes

[More details at https://nodejs.org/api/intl.html]

small code at 0020_internalization.js

Option for building node.js

To control how ICU is used in Node.js, four configure options are available during compilation. Additional details on how to compile Node.js are documented in BUILDING.md.

    --with-intl=none/--without-intl
    --with-intl=system-icu
    --with-intl=small-icu
    --with-intl=full-icu (default)

## Modules

In the Node.js module system, each file is treated as a separate module. For example, consider a file named foo.js:

```JS
  const circle = require('./circle.js');
  console.log(`The area of a circle of radius 4 is ${circle.area(4)}`);
```

On the first line, foo.js loads the module circle.js that is in the same directory as foo.js.

Here are the contents of circle.js:
```JS
  const { PI } = Math;
  // this is a function
  exports.area = (r) => PI * r ** 2;
  // this is a function too !
  exports.circumference = (r) => 2 * PI * r;

```

The module circle.js has exported the functions area() and circumference(). Functions and objects are added to the root of a module by specifying additional properties on the special exports object.

Variables local to the module will be private, because the module is wrapped in a function by Node.js (see module wrapper). In this example, the variable PI is private to circle.js.

The module.exports property can be assigned a new value (such as a function or object).

see 0021_modules.js for full example

[For more details https://nodejs.org/api/modules.html]

the All Together... in the link is worth reading :D


### Folders as modules
It is convenient to organize programs and libraries into self-contained directories, and then provide a single entry point to those directories. There are three ways in which a folder may be passed to require() as an argument.


## Net

The net module provides an asynchronous network API for creating stream-based TCP or IPC servers (net.createServer()) and clients (net.createConnection()).

It can be accessed using:

```JS
const net = require('net');
```

[More details at https://nodejs.org/api/net.html]

<!-- TODO: EXAMPLE OF NET -->

## OS

The os module provides operating system-related utility methods and properties. It can be accessed using:

```JS
  const os = require('os');
```


## Path

The path module provides utilities for working with file and directory paths. It can be accessed using:

```JS
  const path = require('path');
```

find code at 0023_path.js


The path.basename() methods returns the last portion of a path, similar to the Unix basename command. Trailing directory separators are ignored, see path.sep.

[more details of each method at https://nodejs.org/api/path.html]


## Performance Timing API

The Performance Timing API provides an implementation of the W3C Performance Timeline specification. The purpose of the API is to support collection of high resolution performance metrics. This is the same Performance API as implemented in modern Web browsers.

[more details about specifications at https://w3c.github.io/performance-timeline/]

find code at 0024_performance_timing_api.js

<!-- TODO: MAKE A GOOD TUTO WITH AN HTML FILE DARLING ! -->


## Policies

Node.js contains experimental support for creating policies on loading code.

<!-- TODO: MAKE A TUTO WITH POLICIES PLEASE -->

## Process

The process object is a global that provides information about, and control over, the current Node.js process. As a global, it is always available to Node.js applications without using require(). It can also be explicitly accessed using require():

```JS
  const process = require('process');
```

Process events:
* 'beforeExit'
* 'exit'
* 'disconnect'
* 'message'
* 'multipleResolves'
* 'rejectionHandled'
* 'uncaughtException'
* 'unhandledRejection'
* 'unhandledRejection'

[more details at https://nodejs.org/api/process.html]

<!-- TODO: make a worthy tuto on process -->


## Query Strings


## Readline

The readline module provides an interface for reading data from a Readable stream (such as process.stdin) one line at a time. It can be accessed using:

```JS
  const readline = require('readline');
```

Readline events are:
* close
* line
* pause
* resume
* SIGCONT
* SIGINT
* SIGSTP

## REPL

The repl module provides a Read-Eval-Print-Loop (REPL) implementation that is available both as a standalone program or includible in other applications. It can be accessed using:

```JS
  const repl = require('repl');
```

The following special commands are supported by all REPL instances:

  * .break: When in the process of inputting a multi-line expression, entering the .break command (or pressing the ctrl-C key combination) will abort further input or processing of that expression.

  * .clear: Resets the REPL context to an empty object and clears any multi-line expression currently being input.

  * .exit: Close the I/O stream, causing the REPL to exit.

  * .help: Show this list of special commands.

  * .save: Save the current REPL session to a file: > .save ./file/to/save.js

  * .load: Load a file into the current REPL session. > .load ./file/to/load.js

  * .editor: Enter editor mode (ctrl-D to finish, ctrl-C to cancel).

### testing editor mode
  * open a terminal and run node
  * enter .editor
  * write the code you want to edit
  * when you finish do ctrl-D to finish


![REPL editor mode](/assets/images/00005_repl_console_edit.png)

[ more details at https://nodejs.org/api/repl.html]

### Default evaluation

By default, all instances of repl.REPLServer use an evaluation function that evaluates JavaScript expressions and provides access to Node.js' built-in modules.


![REPL editor mode](/assets/images/00006_repl_default_evaluation.png)

### global and local scope

try this code
```JS
  const repl = require('repl');
  const msg = 'Potato are healthy, creamy and .... crispy !';

  repl.start('> ').context.m = msg;
```
Properties in the context object appear as local within the REPL:

![REPL editor mode](/assets/images/00007_repl_local_scope.png)

Read only

to have a local variable access as read only you have to specify it with the Object.defineProperty.


![REPL editor mode](/assets/images/00008_repl_read_only_property.pngf)

### Assignement of _ (underscore)

The default evaluator will, by default, assign the result of the most recently evaluated expression to the special variable _ (underscore). Explicitly setting _ to a value will disable this behavior.

_error refers to last error

### Clear context



[ more details at https://nodejs.org/api/repl.html]

## Report

## Stream

A stream is an abstract interface for working with streaming data in Node.js. The stream module provides an API for implementing the stream interface.

There are many stream objects provided by Node.js. For instance, a request to an HTTP server and process.stdout are both stream instances.

Streams can be readable, writable, or both. All streams are instances of EventEmitter.

To access the stream module:

```JS
  const stream = require('stream');
```

### Types of streams
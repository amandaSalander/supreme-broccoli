# Async

## Introduction

Javascript is asynchronous by nature so Node si naturally too. Asynchronous is a design pattern which ensure the non-blocking code execution.

more precisely:

In multithreaded computer programming, asynchronous method invocation (AMI), also known as asynchronous method calls or the asynchronous pattern is a design pattern in which the call site is not blocked while waiting for the called code to finish. Instead, the calling thread is notified when the reply arrives. Polling for a reply is an undesired option. [Wikipedia https://en.wikipedia.org/wiki/Asynchronous_method_invocation]


Asynchronous programming is great for faster execution of programs but it comes with price. That’s right, its tideous to program and most of the time we end up having callback hell scenario.

the code in 001_async.js is a sync one, where each instruction is blocking

the result of 001_async.js execution

![SYNC CODE WITH FS](/assets/images/00009_async_sync_example.png)

in the example 002_async.js, we use a callback function, when reading the file
the second console.log is read before the execution of the callback
which is the proof that the readFile is non-blocking in this case.

![ASYNC CODE WITH FS](/assets/images/00010_async_callback_fs.png)

## Callback hell
we just used callback to make our code async, when you use too much nested callback (deeply nest async function) you beome evil !

Let me explain:

“Callback Hell” is a JavaScript anti-pattern caused by deeply nesting asynchronous functions. Async is nice but you have to handle it correctly

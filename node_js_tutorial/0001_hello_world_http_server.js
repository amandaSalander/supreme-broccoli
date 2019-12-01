#!/usr/bin/env node

const http= require('http'); // Load the http module

const port_id=3000;
http.createServer((request, response) => {

        // send the 200 for telling everything is OK with data
        // content-type being plain text
        response.writeHead(200,{'Content-Type':'text/plain'});
        // write the plain text
        response.write('Hello world!\n');
        // tell the server that all the responses have been sent
        response.end();
}).listen(port_id); // the created server listen to the port_id 3000
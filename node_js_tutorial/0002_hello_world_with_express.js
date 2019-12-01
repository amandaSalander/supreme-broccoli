const express= require('express'); // Load express module

// create an express application
const app= express();
// define port number to 3000
const port_id=3000;

// Routes HTTP GET requests to the specified path "/"
// with the specified callback function
app.get('/', function(req, res) {
    res.send('Hello, World!');
});

app.listen(port_id,()=>{
    console.log('Server listening on http://localhost:'+port_id);
})
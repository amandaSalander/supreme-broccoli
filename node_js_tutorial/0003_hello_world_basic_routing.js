const http=require('http');

const port_id=3000

let routes={
    '/':function(req,res){
        res.writeHead(200);
        res.end('Hello, world!');
    },
    '/slope':function(req,res){
        res.writeHead(200);
        res.end('This is your slope :-inf // may the force be with you always');
    }
}
function index(req,res){
    res.writeHead(200);
    res.end('Hello, world!');
}

http.createServer((req,res)=>{
    if (req.url in routes){
        return routes[req.url](req,res);
    }

    res.writeHead(404);
    res.end(http.STATUS_CODES[404]);
}).listen(port_id);
const http = require('http');
const colors= require('colors');

const handleServer=function(req,res){

    res.writeHead(200,{'Content-type':'text/html'});
    res.write('<h1>Boenas</h1>');
    console.log('Pego'.green)
    res.end();
}
const server=http.createServer(handleServer);

server.listen(3000,function(){
    console.log('Server on port 3000');
})
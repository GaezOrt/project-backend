const express=require('express');
const server=express();


server.use(express.json())

server.get('/xx',function(req,res){
    res.send('<h1>Hola hermano GET</h1>');
    res.end();
})

server.post('/login',function(req,res){

    
    console.log(req.body);
    res.send({id:1,name:'Nombre'});
    res.end();
})

/*server.post('/login',(req,res)=>{
    console.log(req);
    
    
    res.send([{username:`Hola ${name}`},{username:`Hola ${name} amigo`}])
    res.end();
})

*/


server.listen(3000,function(){
    console.log('Port 3000')
})
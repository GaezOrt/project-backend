const express=require('express');
const server=express();
const mysql = require('mysql');

server.use(express.json())
function createConnection(){
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'prueba'
    });
    return con;
}
server.get('/xx',function(req,res){
    res.send('<h1>Hola hermano GET</h1>');
    res.end();
})
server.get('/clients',function(req,res){
    
    let con = createConnection();
    con.connect();
    
    var sql = 'SELECT * FROM characters';
    con.query(sql, function (err, result) {
        if (err) throw err;
        
        res.send(result);
    })
})
server.post('/login',function(req,res){
    let con = createConnection();
    con.connect();

    
      var username = req.body.username;
      var password = req.body.password;

      var sql = 'SELECT * FROM clients WHERE name = '+ mysql.escape(username)+' and '+' password = '+mysql.escape(password);
      con.query(sql, [username], function (err, result) {
          if (err) throw err;
          console.log(result[0]);
          if(result[0]!=null){
             
              res.send({error:undefined});
          }else{
            res.send({error:'Account doesnt exist'});
          }
        });
   // res.send({id:1,name:'Nombre'});
    //res.end();
})



server.post('/register',function(req,res){
   con=createConnection();
    con.connect();

    var username = req.body.username;
    var sql = 'SELECT * FROM clients WHERE name = '+ mysql.escape(username);
    con.query(sql, [username], function (err, result) {
        if (err) throw err;

        if(result[0]!=null){
            console.log('Cliente ya existe.')
            res.send({error:'That client name is taken.'});
        }else{
            console.log('Cliente creado.')
            var sql = "INSERT INTO clients (name, password) VALUES ?";
            var values = [
              [req.body.username, req.body.password]
            ];
            con.query(sql, [values], function (err, result) {
                if (err) throw err;
                res.send({error:undefined});
              });
        }
      });
    
    
    
   // res.send({id:1,name:'Nombre'});
    //res.end();
})


server.post('/create-character',function(req,res){
    con=createConnection();
     con.connect();
 
     var character = req.body.character;
     var sql = 'SELECT * FROM characters WHERE name = '+ mysql.escape(character);
     con.query(sql, [character], function (err, result) {
         if (err) throw err;
 
         if(result[0]!=null){
             console.log('The character already exists.')
             res.send({error:'The character already exists.'});
         }else{
             console.log('Character created')
             var sql = "INSERT INTO characters (name, movie,link) VALUES ?";
             var values = [
               [req.body.character, req.body.movie, req.body.link]
             ];
             con.query(sql, [values], function (err, result) {
                 if (err) throw err;
                 res.send({error:undefined});
               });
         }
       });
     
     
     
    // res.send({id:1,name:'Nombre'});
     //res.end();
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
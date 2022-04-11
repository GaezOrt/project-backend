const express=require('express');
const server=express();
const mysql = require('mysql');

server.use(express.json())

server.get('/xx',function(req,res){
    res.send('<h1>Hola hermano GET</h1>');
    res.end();
})

server.post('/login',function(req,res){
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'prueba'
    });
    con.connect();
    var sql = "INSERT INTO clients (name, password) VALUES ?";
    var values = [
      [req.body.username, req.body.password]
    ];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });

   // res.send({id:1,name:'Nombre'});
    //res.end();
})

server.post('/register',function(req,res){
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'prueba'
    });
    con.connect();

    var username = req.body.username;
    var sql = 'SELECT * FROM clients WHERE name = '+ mysql.escape(username);
    con.query(sql, [username], function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows);
        if(result.affectedRows!=null){
            console.log('Existe registor ya');
        }else{
            console.log('No existe registro')
            var sql = "INSERT INTO clients (name, password) VALUES ?";
            var values = [
              [req.body.username, req.body.password]
            ];
            con.query(sql, [values], function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
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
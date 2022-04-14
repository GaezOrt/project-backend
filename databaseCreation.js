const mysql = require('mysql');



function createDb(){
   let con= createConnection();
con.connect(function(err) {
     let con = createConnection();
    con.connect();
    if (err) throw err;

    con.query("CREATE TABLE characters (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), movie VARCHAR(255), link TEXT)", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });
}

createDb();
function createConnection(){
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'prueba'
    });
    return con;
}

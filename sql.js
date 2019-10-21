var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'momlamrds.c1f1b5fwsook.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'qwertyuiop',
    database: 'momlam1'
});

// Crear base de datos 
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE momlamdb", function (err, result) {
//       if (err) throw err;
//       console.log("Database created");
//     });
//   });

//crear tabla
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE syrusmsg2 (igmsg INT,hora TIME(6),fecha DATETIME(6),longitud VARCHAR(255),latitud VARCHAR(255),RPM VARCHAR(255),id VARCHAR(255))";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});

//Insertar elemento
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "INSERT INTO syrusmsg (mensaje) VALUES ('LUCHO ES BOBO')";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted");
//     });
//   });
// Borrar elemneto de la base de datos
// con.connect(function(err) {
//     if (err) throw err;
//     var sql = "DELETE FROM syrusmsg WHERE mensaje = 'LUCHO ES BOBO'";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Number of records deleted: " + result.affectedRows);
//     });
//   });
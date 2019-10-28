//data base
var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'momlamrds.c1f1b5fwsook.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'qwertyuiop',
    database: 'momlam1'
});
//sniffer
const dgram = require("dgram");
const server = dgram.createSocket("udp4");
var mensaje;
server.on("error", err => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});
server.on("message", (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  mensaje = msg.toString("utf8");
  let id = mensaje.slice(0,1);
  console.log(id);
  // Deco
  let long, lat, fech;
  long = mensaje.slice(28,38);
  long = parseFloat(long);
  lat = mensaje.slice(20, 28);
  lat = parseFloat(lat);
  if (long > 0) {
    if (long < 10) {
      long = -70 - long;
    }
  }
  if (long > 70) {
    long = -1 * long;
  }

  console.log(lat);

  fech = mensaje.slice(7, 20);
  //d = datos[10];
  // tiem = datos.slice(11, 16);
  fech = new Date(parseFloat(fech) - 18000000); // Parses a string and returns a number
  // console.log(fech);
  let Fecha = `${fech.getFullYear()}-${fech.getMonth() + 1}-${fech.getDate()}`;
  let Hora = `${fech.getHours()}:${fech.getMinutes()}:${fech.getSeconds()}`;
  let RPM=0;
  if (id=="M"){
    if (con) {
 
      console.log("Connected!");
      var sql =
        "INSERT INTO syrusmsg (fecha , hora , Latitud , Longitud,ID ) VALUES ?";
      var value = [[Fecha, Hora, lat, long,id]];
      con.query(sql, [value], function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        //con.end();
      });
    } else {
      console.log("Error conection with db");
    }
  } else if (id=="L"){
    if (con) {
 
      console.log("Connected!");
      var sql =
        "INSERT INTO syrusmsg2 (fecha , hora , Latitud , Longitud,RPM,ID ) VALUES ?";
      var value = [[Fecha, Hora, lat, long,RPM,id]];
      con.query(sql, [value], function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        //con.end();
      });
    } else {
      console.log("Error conection with db");
    }
  }
  

  // insertar aqui db
});
server.on("listening", () => {
  const address = server.address();
  //console.log(`server listening ${address.address}:${address.port}`);
});
server.bind(41500, "172.31.93.87"); //172.31.86.140
// Prints: server listening 0.0.0.0:41234

//base de datos

// server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var hbs = require("express-hbs");
const path = require("path");
const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine(
  "hbs",
  hbs.express4({
    partialsDir: __dirname + "/views"
  })
);
app.set("view engine", ".hbs");
app.set("views", __dirname + "/views");

// static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/coord", (req, res) => {
  if (con) {
    var sql = "SELECT * FROM syrusmsg ORDER BY igmsg DESC limit 1 ";
    con.query(sql, function(err, result) {
      if (err) throw err;
      res.json(result[0]);
      //con.end();
    });
  } else {
    console.log("error conection with db");
  }
  //res.json(`${mensaje}`);
});
app.get("/coord1", (req, res) => {
    if (con) {
      var sql = "SELECT * FROM syrusmsg2 ORDER BY igmsg DESC limit 1 ";
      con.query(sql, function(err, result) {
        if (err) throw err;
        res.json(result[0]);
        //con.end();
      });
    } else {
      console.log("error conection with db");
    }
    //res.json(`${mensaje}`);
  });
// app.get('/plana', (req, res) => {
//     res.render('coor', {});
// });
app.post("/history", (req, res) => {
  console.log(req.body); // Requiring data in historicos
  if (con) {
    console.log("Connected!");
    var sql =
      "SELECT * FROM syrusmsg where fecha between ? and ? and hora between ? and ? ";
    var value = [
      req.body.fecha1,
      req.body.fecha2,
      req.body.hora1,
      req.body.hora2
    ];
    con.query(sql, value, function(err, result) {
      if (err) throw err;
      res.json(result);
      //con.end();
    });
  } else {
    console.log("Error conection with db");
  }
});
app.post("/history2", (req, res) => {
  console.log(req.body); // Requiring data in historicos
  if (con) {
    console.log("Connected!");
    var sql =
      "SELECT * FROM syrusmsg2 where fecha between ? and ? and hora between ? and ? ";
    var value = [
      req.body.fecha1,
      req.body.fecha2,
      req.body.hora1,
      req.body.hora2
    ];
    con.query(sql, value, function(err, result) {
      if (err) throw err;
      res.json(result);
      //con.end();
    });
  } else {
    console.log("Error conection with db");
  }
});
app.get("/mapa", (req, res) => {
  res.render("mapa", {});
});
app.get("/historicos", (req, res) => {
  res.render("historicos", {});
});

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});
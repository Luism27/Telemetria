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
  let rpmh= mensaje.slice(20,45);
  let rpmh2=rpmh.split(" ")
  console.log(rpmh2==41)
  console.log(`los rpm son ${rpmh} `)
  console.log(`los rpm1 son ${rpmh2[0]} `)
  console.log(`los rpm2 son ${rpmh2[1]} `)
  console.log(`los rpm3 son ${rpmh2[2]} `)
  console.log(`los rpm4 son ${rpmh2[3]} `)
  console.log(`los rpm5 son ${rpmh2[4]} `)
  console.log(`los rpm6 son ${rpmh2[5]} `)
  console.log(`los rpm7 son ${rpmh2[6]} `)
  console.log(`los rpm8 son ${rpmh2[7]} `)
  console.log(`la id es ${id}  `);
  let rpmhe= rpmh2[6] + rpmh2[7];
  let rpmdec= parseInt(rpmhe,16);
  let rpm=rpmdec/4;
  console.log(`rpm en dec ${rpmdec} `)
  // Deco
  let long, lat, fech;
  long = mensaje.slice(53,66);
  long = parseFloat(long);
  lat = mensaje.slice(45, 54);
  lat = parseFloat(lat);
  console.log(`la latitud es ${lat} `)
  console.log(`la longitud es ${long} `)
  if (long > 0) {
    if (long < 10) {
      long = -70 - long;
    }
  }
  if (long > 70) {
    long = -1 * long;
  }

  

  fech = mensaje.slice(7, 20);
  console.log(`la fecha es ${fech} `)
  //d = datos[10];
  // tiem = datos.slice(11, 16);
  fech = new Date(parseFloat(fech) - 18000000); // Parses a string and returns a number
  // console.log(fech);
  let Fecha = `${fech.getFullYear()}-${fech.getMonth() + 1}-${fech.getDate()}`;
  let Hora = `${fech.getHours()}:${fech.getMinutes()}:${fech.getSeconds()}`;
  let RPM=0;

  // insertar aqui db
});
server.on("listening", () => {
  const address = server.address();
  //console.log(`server listening ${address.address}:${address.port}`);
});
server.bind(41500, "172.31.93.87"); //172.31.86.140
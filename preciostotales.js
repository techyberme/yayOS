const https = require('https');
const fs = require("fs");
const csv = require("csv-stringify");
const apiUrl = 'https://api.preciodelaluz.org/v1/prices/all?zone=PCB';
const horas= ['00-01','01-02','02-03','03-04','04-05','05-06','06-07','07-08','08-09',
'09-10','10-11','11-12','12-13','13-14','14-15','15-16','16-17','18-19','19-20','20-21','21-22','22-23','23-24']
const precios =[]
var suma=0
var long=0
https.get(apiUrl, res => {
  let data = '';
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);
  res.on('data', chunk => {
    data += chunk;
  }); 
  res.on('end', () => {
    console.log('Response ended: ');
    try {
      const jsonData = JSON.parse(data);
      csv.stringify([['hora','precio']], (e,o) => fs.writeFileSync("data.csv", o));
      for (let i = 0; i < horas.length; i++){
      var horaDato=jsonData[horas[i]]
      console.log(`Precio de la electricidad más bajo hoy, ${horaDato.date} :`);
      console.log(`Entre las  ${horaDato.hour} el precio será: ${horaDato.price} ${horaDato.units}`);
      dato=[[i+1,horaDato.price]]
      precios.push(horaDato.price)  //mete el precio en la lista
      csv.stringify(dato, (e,o) => fs.appendFileSync("data.csv", o));
    }
      long=precios.length
      avg = precios.reduce((a, b) => a + b, 0)/long
      console.log(Math.max(...precios))} catch (error) {
      console.error('Error parsing JSON:', error.message);
    }
  });
}).on('error', err => {
  console.error('Error: ', err.message);
});


 



  /*res.on('end', () => {
    console.log('Response ended: ');
    try {
      const jsonData = JSON.parse(data);
      const hourData = jsonData['00-01']; // Access data for the "00-01" hour

      if (hourData) {
        console.log('Data for "00-01" hour:');
        console.log(`Date: ${hourData.date}`);
        console.log(`Hour: ${hourData.hour}`);
        console.log(`Is Cheap: ${hourData['is-cheap']}`);
        console.log(`Is Under Average: ${hourData['is-under-avg']}`);
        console.log(`Market: ${hourData.market}`);
        console.log(`Price: ${hourData.price} ${hourData.units}`);
      } else {
        console.log('Data for "00-01" hour not found in the response.');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error.message);
    }
  });
}).on('error', err => {
  console.error('Error: ', err.message);
});*/

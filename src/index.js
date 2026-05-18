const { PORT } = require("./config");
const express = require("express");
const apiRoutes = require("./routes");
const { ServerConfig, logger } = require("./config");
const db = require("./models");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`The server is running on the PORT: ${ServerConfig.PORT}`);

  const { City, Airport } = require("./models");
  // const city = await City.findByPk(1);
  // console.log(city);
  // await city.createAirport({name : "Aashu's Airport" , address : "ladwa"})
  // const airports = await city.getAirports() ;
  // console.log(airports);

  // const aashu_airport = await Airport.findByPk(1);
  // console.log(aashu_airport, "jai maata di ")
  // await city.removeAirport(aashu_airport);

  // await City.destroy({
  //   where : {
  //     id : 1
  //   }
  // })

  // // await City.create({name : "Mumbai"});
  // const city = await City.findByPk(10);
  // console.log(city) ;

  // // await city.createAirport({name : "Kempegowda" , address : "banglore", code : "KGD", cityId : 10});
  // await city.createAirport({name :"Sach airport1", address : "banglore3" , code : "SATQ", cityId : 10})



});

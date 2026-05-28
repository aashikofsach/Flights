
const { Flight, Airplane, Airport, City } = require("../models/");
const CrudRepository = require("./crud-repository");

const {addRowLockonFlights} = require("./queries")

const db = require("../models/");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          required: true, // this act as inner join when its true , includes helps in eager loading (cute concept)
          as: "airplaneDetail",
        },
        {
          model: Airport,
          required: true,
          as: "departureAirport", // as isliye use kara kyuki flight model se 2 assosiations hai to Airport table toh differentiate ke
          // liye as use kara hai , and this as name should be match with which used in corresponding model file ( flight.js in models)
          // agar on define karne ki baat aati toh wo yehi karte
          include: [
            {
              model: City,
              required: true,
              // as : city/
            },
          ],
        },
        {
          model: Airport,
          required: true,
          as: "arrivalAirport",
          include: [
            {
              model: City,
              required: true,
              // as : city/
            },
          ],
        },
      ],
    });
    return response;
  }

  async updateRemainingSeats(flightId, seats, dec = true) {
    await db.sequelize.query(addRowLockonFlights(flightId)); // here we have to use actual table name 
    const flight = await Flight.findByPk(flightId);
    const shouldDecreaseSeats = dec === true || dec === "true";
    if (shouldDecreaseSeats) {
      await flight.decrement("totalSeats", { by: seats });
      
    } else {
      await flight.increment("totalSeats", { by: seats });
      
    }
    await flight.reload(); // so that we can return the updated value, without this we are getting the stale data .

    return flight;
  }
}

module.exports = FlightRepository;

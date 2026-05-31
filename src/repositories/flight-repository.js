const { Flight, Airplane, Airport, City } = require("../models/");
const CrudRepository = require("./crud-repository");

const { addRowLockonFlights } = require("./queries");

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
    const transaction = await db.sequelize.transaction();
    try {
      await db.sequelize.query(addRowLockonFlights(flightId), {
        transaction,
      }); // here we have to use actual table name
      const flight = await Flight.findByPk(flightId, {
        transaction,
      });
      const shouldDecreaseSeats = dec === true || dec === "true";
      if (shouldDecreaseSeats) {
        await flight.decrement("totalSeats", {
          by: seats,
          transaction,
        });
      } else {
        await flight.increment("totalSeats", {
          by: seats,
          transaction,
        });
      }
      await flight.reload({
        transaction,
      }); // so that we can return the updated value, without this we are getting the stale data .

      await transaction.commit();
      return flight;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = FlightRepository;

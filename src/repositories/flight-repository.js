const { Flight, Airplane, Airport } = require("../models/");
const CrudRepository = require("./crud-repository");

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
          required: true, // this act as inner join 
        },
        {
          model: Airport,
          required: true,
          as : "departureAirport"
        },
        {
            model : Airport,    
            required : true ,
            as : "arrivalAirport"

        }
      ],
    });
    return response;
  }
}

module.exports = FlightRepository;

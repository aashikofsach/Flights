const {Flight} = require("../models/");
const CrudRepository = require("./crud-repository");

class AirportRepository extends CrudRepository{
    constructor()
    {
        super(Flight)
    }
}

module.exports = AirportRepository ;
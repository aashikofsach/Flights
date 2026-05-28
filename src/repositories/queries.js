
function addRowLockonFlights(flightId)
{
    return `select * from Flights where Flights.id = ${flightId} for Update ;`;
}

module.exports ={
    addRowLockonFlights
}
const winston = require("winston");

const logger = winston.createLogger({
    format : winston.format.combine(
        winston.format.timestamp({format : "YYYY-MM-DD HH:mm:ss"}),
        winston.format.printf(({level , message , timestamp})=>{
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })

    ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/combined.log" }),
    new winston.transports.File({filename : "logs/error.log" , level : "error"})
  ],
});

module.exports = {
  logger
};
 
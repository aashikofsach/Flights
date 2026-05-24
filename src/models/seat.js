"use strict";
const { Model } = require("sequelize");
const { Enums } = require("../utils/common/");
const { ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST_CLASS } = Enums.SEAT_TYPE;
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

       this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        as : "airplaneDetail",
        onUpdate: "cascade",
        onDelete: "cascade",
      });

    }
  }
  Seat.init(
    {
      airplaneId: {
        type: DataTypes.INTEGER,
      },
      row: {
        type: DataTypes.INTEGER,
      },
      column: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM,
        defaultValue: ECONOMY,
        values: [ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS, BUSINESS],
      },
    },
    {
      sequelize,
      modelName: "Seat",
    },
  );
  return Seat;
};

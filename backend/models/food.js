"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Food extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.Schedule, {
                through: "Schedule_Food",
                foreignKey: "food_id",
            });
            // define association here
        }
    }
    Food.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING,
            calories: DataTypes.DOUBLE,
            picture: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Food",
        }
    );
    return Food;
};

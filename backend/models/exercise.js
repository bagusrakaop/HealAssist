"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Exercise extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.Schedule, {
                through: "Schedule_Exercise",
                foreignKey: "ex_id",
            });
            // define association here
        }
    }
    Exercise.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING,
            calBurned: {
                type: DataTypes.INTEGER,
                field: "cal_burned",
            },
            duration: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Exercise",
        }
    );
    return Exercise;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Schedule.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                field: "user_id",
                references: {
                    model: "User",
                    key: "id",
                },
            },
            date: DataTypes.DATE,
            time: DataTypes.TIME,
        },
        {
            sequelize,
            modelName: "Schedule",
        }
    );
    return Schedule;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Schedule_Exercise extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Schedule_Exercise.init(
        {
            schedId: {
                type: DataTypes.INTEGER,
                field: "sched_id",
                references: {
                    model: "Schedule",
                    key: "id",
                },
            },
            exId: {
                type: DataTypes.INTEGER,
                field: "ex_id",
                references: {
                    model: "Exercise",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "Schedule_Exercise",
        }
    );
    return Schedule_Exercise;
};

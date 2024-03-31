"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Schedule_Food extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Schedule_Food.init(
        {
            schedId: {
                type: DataTypes.INTEGER,
                field: "sched_id",
                references: {
                    model: "Schedule",
                    key: "id",
                },
            },
            foodId: {
                type: DataTypes.INTEGER,
                field: "food_id",
                references: {
                    model: "Food",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "Schedule_Food",
            timestamps: false,
        }
    );
    return Schedule_Food;
};

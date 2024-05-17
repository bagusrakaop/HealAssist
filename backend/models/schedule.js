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
            this.belongsTo(models.User, { foreignKey: "user_id" });
            this.belongsToMany(models.Food, {
                through: "Schedule_Food",
                foreignKey: "sched_id",
            });
            this.belongsToMany(models.Exercise, {
                through: "Schedule_Exercise",
                foreignKey: "sched_id",
            });
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
            status: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Schedule",
        }
    );
    return Schedule;
};

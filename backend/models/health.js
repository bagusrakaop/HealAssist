"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Health extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {
                foreignKey: "user_id",
            });
        }
    }
    Health.init(
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
            age: DataTypes.INTEGER,
            sex: DataTypes.INTEGER,
            height: DataTypes.INTEGER,
            weight: DataTypes.INTEGER,
            smoke: DataTypes.INTEGER,
            health: DataTypes.INTEGER,
            checkup: DataTypes.INTEGER,
            exercise: DataTypes.INTEGER,
            diabetes: DataTypes.INTEGER,
            alcoholDays: {
                type: DataTypes.INTEGER,
                field: "alcohol_days",
            },
            generalHealth: {
                type: DataTypes.INTEGER,
                field: "general_health",
            },
            mentalHealthDays: {
                type: DataTypes.INTEGER,
                field: "mental_health_days",
            },
            fruit: DataTypes.INTEGER,
            cholesterol: DataTypes.INTEGER,
            tobacco: DataTypes.INTEGER,
            ecig: DataTypes.INTEGER,
            averageDrink: {
                type: DataTypes.INTEGER,
                field: "average_drink",
            },
            maxDrink: {
                type: DataTypes.INTEGER,
                field: "max_drink",
            },
            fruitJuice: {
                type: DataTypes.INTEGER,
                field: "fruit_juice",
            },
            greenVegetable: {
                type: DataTypes.INTEGER,
                field: "green_vegetable",
            },
            friedPotato: {
                type: DataTypes.INTEGER,
                field: "fried_potato",
            },
            otherPotato: {
                type: DataTypes.INTEGER,
                field: "other_potato",
            },
            otherVegetable: {
                type: DataTypes.INTEGER,
                field: "other_vegetable",
            },
            prediction: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Health",
        }
    );
    return Health;
};

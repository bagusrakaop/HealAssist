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
                foreignKey: "user_id"
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
            tall: DataTypes.INTEGER,
            weight: DataTypes.INTEGER,
            smoke: DataTypes.INTEGER,
            health: DataTypes.INTEGER,
            checkup: DataTypes.INTEGER,
            exercise: DataTypes.INTEGER,
            depression: DataTypes.INTEGER,
            diabetes: DataTypes.INTEGER,
            arthritis: DataTypes.INTEGER,
            skinCancer: {
                type: DataTypes.INTEGER,
                field: "skin_cancer",
            },
            otherCancer: {
                type: DataTypes.INTEGER,
                field: "other_cancer",
            },
            alcohol: DataTypes.INTEGER,
            fruit: DataTypes.INTEGER,
            vegetables: DataTypes.INTEGER,
            potatoes: DataTypes.INTEGER,
            prediction: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Health",
        }
    );
    return Health;
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        return Promise.all([
            queryInterface.removeColumn("Health", "tall"),
            queryInterface.removeColumn("Health", "depression"),
            queryInterface.removeColumn("Health", "arthritis"),
            queryInterface.removeColumn("Health", "skin_cancer"),
            queryInterface.removeColumn("Health", "other_cancer"),
            queryInterface.removeColumn("Health", "alcohol"),
            queryInterface.removeColumn("Health", "vegetables"),
            queryInterface.removeColumn("Health", "potatoes"),
            queryInterface.removeColumn("Health", "health"),
            queryInterface.addColumn(
                "Health", // table name
                "height", // new field name
                {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                }
            ),
            queryInterface.addColumn("Health", "alcohol_days", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "general_health", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "mental_health_days", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "cholesterol", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "tobacco", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "ecig", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "average_drink", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "max_drink", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "fruit_juice", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "green_vegetable", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "fried_potato", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "other_potato", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "other_vegetable", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        return Promise.all([
            queryInterface.addColumn("Health", "tall", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "depression", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "arthritis", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "skin_cancer", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "other_cancer", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "alcohol", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "vegetables", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "potatoes", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Health", "health", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.removeColumn("Health", "height"),
            queryInterface.removeColumn("Health", "alcohol_days"),
            queryInterface.removeColumn("Health", "general_health"),
            queryInterface.removeColumn("Health", "mental_health_days"),
            queryInterface.removeColumn("Health", "cholesterol"),
            queryInterface.removeColumn("Health", "height"),
            queryInterface.removeColumn("Health", "tobacco"),
            queryInterface.removeColumn("Health", "ecig"),
            queryInterface.removeColumn("Health", "average_drink"),
            queryInterface.removeColumn("Health", "max_drink"),
            queryInterface.removeColumn("Health", "fruit_juice"),
            queryInterface.removeColumn("Health", "green_vegetable"),
            queryInterface.removeColumn("Health", "fried_potato"),
            queryInterface.removeColumn("Health", "other_potato"),
            queryInterface.removeColumn("Health", "other_vegetable"),
        ]);
    },
};


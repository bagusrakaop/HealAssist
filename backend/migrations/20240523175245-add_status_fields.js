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
            queryInterface.addColumn(
                "Schedule_Exercise", // table name
                "status", // new field name
                {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                }
            ),
            queryInterface.addColumn("Schedule_Food", "status", {
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
            queryInterface.removeColumn("Schedule_Exercise", "status"),
            queryInterface.removeColumn("Schedule_Food", "status"),
        ]);
    },
};


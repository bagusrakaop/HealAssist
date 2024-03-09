"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Migrasi untuk tabel 'User'
        await queryInterface.createTable("User", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            username: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        // Migrasi untuk tabel 'Health'
        await queryInterface.createTable("Health", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "User",
                        schema: "public",
                    },
                    key: "id",
                },
                allowNull: false,
            },
            age: {
                type: Sequelize.INTEGER,
            },
            sex: {
                type: Sequelize.INTEGER,
            },
            tall: {
                type: Sequelize.INTEGER,
            },
            weight: {
                type: Sequelize.INTEGER,
            },
            smoke: {
                type: Sequelize.INTEGER,
            },
            health: {
                type: Sequelize.INTEGER,
            },
            checkup: {
                type: Sequelize.INTEGER,
            },
            exercise: {
                type: Sequelize.INTEGER,
            },
            depression: {
                type: Sequelize.INTEGER,
            },
            diabetes: {
                type: Sequelize.INTEGER,
            },
            arthritis: {
                type: Sequelize.INTEGER,
            },
            skin_cancer: {
                type: Sequelize.INTEGER,
            },
            other_cancer: {
                type: Sequelize.INTEGER,
            },
            alcohol: {
                type: Sequelize.INTEGER,
            },
            fruit: {
                type: Sequelize.INTEGER,
            },
            vegetables: {
                type: Sequelize.INTEGER,
            },
            potatoes: {
                type: Sequelize.INTEGER,
            },
            prediction: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        // Migrasi untuk tabel 'Schedule'
        await queryInterface.createTable("Schedule", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "User",
                        schema: "public",
                    },
                    key: "id",
                },
                allowNull: false,
            },
            date: {
                type: Sequelize.DATE,
            },
            time: {
                type: Sequelize.TIME,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        // Migrasi untuk tabel 'Exercise'
        await queryInterface.createTable("Exercise", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            cal_burned: {
                type: Sequelize.INTEGER,
            },
            duration: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        // Migrasi untuk tabel 'Food'
        await queryInterface.createTable("Food", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            calories: {
                type: Sequelize.DOUBLE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        // Migrasi untuk tabel 'Schedule_Exercise'
        await queryInterface.createTable("Schedule_Exercise", {
            sched_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "Schedule",
                        schema: "public",
                    },
                    key: "id",
                },
                allowNull: false,
            },
            ex_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "Exercise",
                        schema: "public",
                    },
                    key: "id",
                },
                allowNull: false,
            },
        });

        // Migrasi untuk tabel 'Schedule_Food'
        await queryInterface.createTable("Schedule_Food", {
            sched_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "Schedule",
                        schema: "public",
                    },
                    key: "id",
                },
                allowNull: false,
            },
            food_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "Food",
                        schema: "public",
                    },
                    key: "id",
                },
                allowNull: false,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Schedule_Food");
        await queryInterface.dropTable("Schedule_Exercise");
        await queryInterface.dropTable("Food");
        await queryInterface.dropTable("Exercise");
        await queryInterface.dropTable("Schedule");
        await queryInterface.dropTable("Health");
        await queryInterface.dropTable("User");
    },
};

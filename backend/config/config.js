require("dotenv").config();
const fs = require("fs");

module.exports = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgresql",
    dialectOptions: {
        bigNumberStrings: true,
        ssl: {
            require: true,
        },
    },
    define: {
        freezeTableName: true,
    },
    logging: false,
};

// database configurations handled here

require('dotenv').config();

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: '',
    DB: "constructions",
    dialect: "mysql",
    pool: {
        ax: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
  };

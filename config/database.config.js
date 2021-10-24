// database configurations handled here

require('dotenv').config();

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    pool: {
        ax: process.env.POOL_MAX,
        min: parseInt(process.env.POOL_MIN, 10),
        acquire: process.env.POOL_ACQUIRE,
        idle: process.env.POOL_IDLE
    }
  };

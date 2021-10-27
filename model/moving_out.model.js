require('dotenv').config();
module.exports = (sequelize, Sequelize) => {
    const MovingOut = sequelize.define(process.env.MOVINGOUT_TABLE, {
        reason_ID: {
            type: Sequelize.BIGINT(10),
            primaryKey: true
        },
        Customer_ID	: {
            type: Sequelize.BIGINT(10)
        },
        address	: {
            type: Sequelize.STRING(50)
        },
        latitude: {
            type: Sequelize.STRING(50)
        },
        longitude: {
            type: Sequelize.STRING(50)
        }
    });
    return MovingOut;
  };
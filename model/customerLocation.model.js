require('dotenv').config();
module.exports = (sequelize, Sequelize) => {
    const CustomerLocation = sequelize.define(process.env.CUSTOMER_LOCATION_TABLE, {
        id: {
            type: Sequelize.BIGINT(10),
            primaryKey: true
        },
        location_ID	: {
            type: Sequelize.BIGINT(10)
        },
        customer_ID	: {
            type: Sequelize.BIGINT(10)
        },
        site_name: {
            type: Sequelize.STRING(50)
        },
        adress: {
            type: Sequelize.STRING(50)
        },
        latitude: {
            type: Sequelize.STRING(50)
        },
        longitude: {
            type: Sequelize.STRING(50)
        }
    });
  
    return CustomerLocation;
  };
require('dotenv').config();
module.exports = (sequelize, Sequelize) => {
    const CustomerLocation = sequelize.define('customer_location', {
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
        },
        radius	: {
            type: Sequelize.BIGINT(10)
        },
    });
  
    return CustomerLocation;
  };
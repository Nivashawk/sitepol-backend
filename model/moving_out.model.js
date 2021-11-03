require('dotenv').config();
module.exports = (sequelize, Sequelize) => {
    const MovingOut = sequelize.define('moving_out_SE', {
        reason_ID: {
            type: Sequelize.BIGINT(10),
            defaultValue: null
        },
        Customer_ID	: {
            type: Sequelize.BIGINT(10),
            defaultValue: null
        },
        place_name	: {
            type: Sequelize.STRING(50),
            defaultValue: null
        },
        address	: {
            type: Sequelize.STRING(50),
            defaultValue: null
        },
        latitude: {
            type: Sequelize.STRING(50),
            defaultValue: null
        },
        longitude: {
            type: Sequelize.STRING(50),
            defaultValue: null
        }
    });
    return MovingOut;
  };
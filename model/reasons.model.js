require('dotenv').config();
module.exports = (sequelize, Sequelize) => {
    const Reasons = sequelize.define('reason_SE', {
        reason_ID: {
            type: Sequelize.BIGINT(10),
            primaryKey: true
        },
        main_reason	: {
            type: Sequelize.STRING(50)
        },
        sub_reason	: {
            type: Sequelize.STRING(50)
        }
    });
    return Reasons;
  };
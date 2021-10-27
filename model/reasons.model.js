require('dotenv').config();
module.exports = (sequelize, Sequelize) => {
    const Reasons = sequelize.define(process.env.REASONS_TABLE, {
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
require('dotenv').config();
const today = new Date().toISOString().split('T')[0];

module.exports = (sequelize, Sequelize) => {
    const SE_Quality_hours = sequelize.define('SE_Quality_hours', {
        id: {
            type: Sequelize.BIGINT(10),
            primaryKey: true
        },
        user_id: {
            type: Sequelize.BIGINT(10),
            defaultValue: null
        },
        date : {
            type : Sequelize.STRING(10),
            defaultValue: null
        },
        check_in: {
            type : Sequelize.DATE,
            defaultValue: null
        },
        check_out: {
            type : Sequelize.DATE,
            defaultValue: null
        }
    });
    return SE_Quality_hours;
  };
require('dotenv').config();
const today = new Date().toISOString().split('T')[0];
module.exports = (sequelize, Sequelize) => {
    const track_siteEngineer = sequelize.define('track_siteEngineer', { 
        user_id	: {
            type: Sequelize.BIGINT(10),
            defaultValue: null
        },
        date : {
            type : Sequelize.STRING(10),
            defaultValue: null
        },
        current_site: {
            type: Sequelize.BIGINT(10),
            defaultValue: null
        },
        onduty_status: {
            type: Sequelize.BIGINT(10),
            defaultValue: null
        },
        moving_out_status: {
            type: Sequelize.BIGINT(10),
            defaultValue: 0
        },
        moving_out_time: {
            type : Sequelize.DATE,
            defaultValue: null
        },
        start_reason_id: {
            type: Sequelize.BIGINT(10),
            defaultValue: 0
        },
        end_reason_id: {
            type: Sequelize.BIGINT(10),
            defaultValue: null
        },
        total_distance_travelled: {
            type: Sequelize.BIGINT(10),
            defaultValue: 0
        },
        duty_started: {
            type : Sequelize.DATE,
            defaultValue: null
        },
        duty_ended: {
            type : Sequelize.DATE,
            defaultValue: null
        },
        quality_hours: {
            type: Sequelize.BIGINT(10),
            defaultValue: 0
        },
    });
  
    return track_siteEngineer;
  };
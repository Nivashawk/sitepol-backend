require('dotenv').config();
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.BIGINT(10),
            primaryKey: true
        },
        user_id	: {
            type: Sequelize.BIGINT(10)
        },
        current_site	: {
            type: Sequelize.BIGINT(10)
        },
        user_group_id: {
            type: Sequelize.BIGINT(10)
        },
        user_email: {
            type: Sequelize.STRING(50)
        },
        user_name: {
            type: Sequelize.STRING(50)
        },
        user_password: {
            type: Sequelize.STRING(50)
        },
        user_ip_address: {
            type: Sequelize.STRING(50)
        },
        user_activation_token: {
            type: Sequelize.STRING(50)
        },
        user_forgotten_password_token: {
            type: Sequelize.STRING(50)
        },
        user_forgotten_password_expire: {
            type: Sequelize.DATE
        },
        user_update_email_token: {
            type: Sequelize.STRING(50)
        },
        user_active: {
            type: Sequelize.BIGINT(10)
        },
        user_fail_login_attempts: {
            type: Sequelize.STRING(50)
        },
        user_fail_login_ip: {
            type: Sequelize.STRING(50)
        },
        user_first_login: {
            type: Sequelize.DATE
        },
        user_total_logins: {
            type: Sequelize.BIGINT(50)
        },
        tag_my_location_status: {
            type: Sequelize.BIGINT(50),
            defaultValue:0
        },
        user_last_login: {
            type: Sequelize.DATE
        },
        user_creation_date: {
            type: Sequelize.DATE
        },
    });
  
    return User;
  };
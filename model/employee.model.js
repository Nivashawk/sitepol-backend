require('dotenv').config();
module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define(process.env.EMPLOYEE_TABLE, {
        id: {
            type: Sequelize.BIGINT(10),
            primaryKey: true
        },
        employee_ID: {
            type: Sequelize.BIGINT(10)
        },
        user_ID: {
            type: Sequelize.BIGINT(10)
        },
        employee_name: {
            type: Sequelize.STRING(50)
        },
        designation: {
            type: Sequelize.STRING(50)
        },
        department: {
            type: Sequelize.BIGINT(10)
        },
        work_location: {
            type: Sequelize.BIGINT(10)
        },
        doj: {
            type: Sequelize.DATE
        },
        dor: {
            type: Sequelize.DATE
        },
        dob: {
            type: Sequelize.DATE
        },
        mobile: {
            type: Sequelize.BIGINT(10)
        },
        alternate: {
            type: Sequelize.BIGINT(10)
        },
        email: {
            type: Sequelize.STRING(50)
        },
        father_name: {
            type: Sequelize.STRING(50)
        },
        father_mobile: {
            type: Sequelize.BIGINT(10)
        },
        mother_name: {
            type: Sequelize.STRING(50)
        },
        mother_mobile: {
            type: Sequelize.BIGINT(10)
        },
        present_address: {
            type: Sequelize.STRING(50)
        },
        permanent_address: {
            type: Sequelize.STRING(50)
        },
        blood_group: {
            type: Sequelize.STRING(50)
        },
        photo: {
            type: Sequelize.STRING(50)
        },
        bank_name: {
            type: Sequelize.STRING(50)
        },
        account_no: {
            type: Sequelize.STRING(50)
        },
        pf: {
            type: Sequelize.BIGINT(1)
        },
        pf_no: {
            type: Sequelize.STRING(50)
        },
        esi: {
            type: Sequelize.BIGINT(1)
        },
        esi_no: {
            type: Sequelize.STRING(50)
        },
        certificate1: {
            type: Sequelize.STRING(100)
        },
        certificate2: {
            type: Sequelize.STRING(100)
        },
        id_card: {
            type: Sequelize.BIGINT(1)
        },
        access_card: {
            type: Sequelize.BIGINT(1)
        },
        grade: {
            type: Sequelize.BIGINT(10)
        },
        company_email: {
            type: Sequelize.BIGINT(1)
        },
        offer_letter: {
            type: Sequelize.BIGINT(1)
        },
        city: {
            type: Sequelize.BIGINT(10)
        },
        status: {
            type: Sequelize.BIGINT(1)
        },
        sgstatus: {
            type: Sequelize.BIGINT(1)
        }
    });
  
    return Employee;
  };
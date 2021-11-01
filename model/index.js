const dbConfig = require("../config/database.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

  const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employee = require("./employee.model.js")(sequelize, Sequelize);
db.user = require("./siteEngineer.model.js")(sequelize, Sequelize);
db.customerlocation = require("./customerLocation.model")(sequelize, Sequelize);
db.reason_SE = require("./reasons.model")(sequelize, Sequelize);
db.moving_out_SE = require("./moving_out.model")(sequelize, Sequelize);
db.track_siteEngineer = require("./track_siteEngineer.model")(sequelize, Sequelize);

module.exports = db;
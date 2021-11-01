const db = require("../model");
const create_table = db.track_siteEngineer;

const Op = db.Sequelize.Op;

// Create and Save 
exports.create = (req, res) => {
    const result = create_table.sequelize.sync()
    if(result){
        res.status(200).json({
            code: 200,
            status: "success",
            message: "working",
            result: {
              
            },
          });
    }
    
};
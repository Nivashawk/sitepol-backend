const db = require("../model");
const Employee = db.employee;
const Op = db.Sequelize.Op;

// Create and Save 
exports.create = (req, res) => {
  
};

// Retrieve Emloyee details from the database.
exports.getEmployeeDetails = async (req, res, next) => {
    const employee_ID = req.body.employee_ID;
    
    try {
        var result = await Employee.findOne({ where: {employee_ID:employee_ID} })
        if(result)
        {
            res.status(200).json({
                code : 200,
                status: "success",
                message: "Documents fetched successfully",
                data:[result]
            })
        }
        else
        {
            res.status(200).json({
                code : 401,
                status: "failure",
                message: "No results found",
            })
        }
        
    }catch(err){
        res.json({
            status: "error",
            message:
              "unknown error found from server side",
          });
    }
}
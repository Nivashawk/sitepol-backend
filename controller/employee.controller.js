const db = require("../model");
const Employee = db.employee;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  
};

// Retrieve all Tutorials from the database.
exports.findOne = (req, res) => {
    const employee_ID = req.query.employee_ID;
    
        Employee.findOne({ where: {employee_ID:employee_ID} })
        .then(data => {
            res.status(200).send({
                code : 200,
                status: "success",
                message: "Documents fetched successfully",
                data
            })
            .catch(err => {
                res.status(500).send({
                    code : 500,
                    status: "failure",
                    message: "there are no documents available",
                });
              });
          })
}
    
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};
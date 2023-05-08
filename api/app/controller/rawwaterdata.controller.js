const db = require("../models");
const Rawwaterdata = db.rawwaterdata;

// Create and Save a new Rawwaterdata
exports.create = (req, res) => {
    console.log("inside")
    console.log(req.body)
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const rawwaterdata = new Rawwaterdata({
    source:req.body.source,
    date:req.body.date,
    temperature:req.body.temperature,
    ph:req.body.ph,
    turbidity:req.body.turbidity,
    dissolvedoxygen:req.body.dissolvedoxygen,
    totalmicrocytis:req.body.totalmicrocytis,
    mcyemicrocytis:req.body.mcyemicrocytis,
    mcyeplanktothrix:req.body.mcyeplanktothrix,
    totalmicrocystins:req.body.totalmicrocystins
  });
  rawwaterdata
    .save(rawwaterdata)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Rawwaterdata.",
      });
    });
};

exports.test =(req,res)=>{
    res.json({ message: "Rawwaterdata working." });
}

// Retrieve all Rawwaterdatas from the database.
exports.findAll = (req, res) => {
    Rawwaterdata.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Coagulation."
      });
    });
};

// Find a single Rawwaterdata with an id
exports.findOne = (req, res) => {};

// Update a Rawwaterdata by the id in the request
exports.update = (req, res) => {};

// Delete a Rawwaterdata with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Rawwaterdatas from the database.
exports.deleteAll = (req, res) => {};

// Find all published Rawwaterdatas
exports.findAllPublished = (req, res) => {};

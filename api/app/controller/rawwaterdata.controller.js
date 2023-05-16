const db = require("../models");
const Rawwaterdata = db.rawwaterdata;

// Create and Save a new Rawwaterdata
exports.create = (req, res) => {
    // console.log("inside")
    // console.log(req.body)
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
exports.delete = (req, res) => {
  const id = req.body.id;
  Rawwaterdata.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Coagulation with id=${id}. Maybe Coagulation was not found!`,
        });
      } else {
        res.send({
          message: "Coagulation was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Coagulation with id=" + id,
      });
    });
};

// Delete all Rawwaterdatas from the database.
exports.deleteAll = (req, res) => {
  Rawwaterdata.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Coagulations were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Coagulations."
      });
    });
};

// Find all published Rawwaterdatas
exports.findAllPublished = (req, res) => {};

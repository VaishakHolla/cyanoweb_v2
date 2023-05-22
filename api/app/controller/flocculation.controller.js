const db = require("../models");
const Flocculation = db.flocculation;
const CustomError = require('../utils/customerror');
// Create and Save a new Flocculation
exports.create = (req, res) => {
    // console.log(req.body)
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const flocculation = new Flocculation({
    basic_information: {
      model: req.body.model,
      device: req.body.device,
      date: req.body.date,
      source: req.body.source,
      experiment_id : req.body.experiment_id
    },
    experimental_conditions: {
        water_temperature: req.body.water_temperature, //inputNumber
        water_pH: req.body.water_pH, //inputNumber
        chemical_type: req.body.chemical_type, //dropdown
        other_chemical_type: req.body.other_chemical_type, //inputText
        manufacturer: req.body.manufacturer, //inputText
        chemical_dosage: req.body.chemical_dosage, //inputNumber
        mixing_speed: req.body.mixing_speed, //inputNumber
        reaction_time: req.body.reaction_time, //
        reaction_unit: req.body.reaction_unit, //dropdown [Min,Sec]
      },
      experimental_results: {
        turbidity_initial: req.body.turbidity_initial,
        turbidity_final: req.body.turbidity_final,
        turbidity_removal: req.body.turbidity_removal,
        totalMicrocystis_initial: req.body.totalMicrocystis_initial,
        totalMicrocystis_final: req.body.totalMicrocystis_final,
        totalMicrocystis_removal: req.body.totalMicrocystis_removal,
        mcyeMicrocystis_initial: req.body.mcyeMicrocystis_initial,
        mcyeMicrocystis_final: req.body.mcyeMicrocystis_final,
        mcyeMicrocystis_removal: req.body.mcyeMicrocystis_removal,
        mycePlanktothrix_initial: req.body.mycePlanktothrix_initial,
        mycePlanktothrix_final: req.body.mycePlanktothrix_final,
        mycePlanktothrix_removal: req.body.mycePlanktothrix_removal,
        totalMicrocystins_initial: req.body.totalMicrocystins_initial,
        totalMicrocystins_final: req.body.totalMicrocystins_final,
        totalMicrocystins_removal: req.body.totalMicrocystins_removal,
      },
  });
  flocculation
    .save(flocculation)
    .then((data) => {
      res.send({
        message:"Flocculation successfully created",
        data: data,
      });
    }).catch((err) => {
      // Check for specific error types
      if (err instanceof CustomError) {
        // Handle specific custom error
        const errorResponse = {
          status: 400,
          errorCode: err.code,
          message: err.message,
          data: err.additionalData || null,
        };
        res.status(400).send(errorResponse);
      }else if (err.name === 'ValidationError') {
        // Handle database validation error
        const errorResponse = {
          status: 400,
          errorCode: 'VALIDATION_ERROR',
          message: err.message,
          data: null,
        };
        res.status(400).send(errorResponse);
      }  else {
        // Handle generic error
        const errorResponse = {
          status: 500,
          errorCode: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred.',
          data: null,
        };
        res.status(500).send(errorResponse);
      }
    });
    
      
};

exports.test =(req,res)=>{
    res.json({ message: "Flocculation working." });
}

// Retrieve all Flocculations from the database.
exports.findAll = (req, res) => {
    Flocculation.find()
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

// Find a single Flocculation with an id
exports.findOne = (req, res) => {
  const source = req.body.source;
  // console.log(source)
  Flocculation.find({'basic_information.source':source})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Flocculation not found with source " + source });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Flocculation with source " + source });
    });
};

// Update a Flocculation by the id in the request
exports.update = (req, res) => {};

// Delete a Flocculation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;
  Flocculation.findByIdAndRemove(id)
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

// Delete all Flocculations from the database.
exports.deleteAll = (req, res) => {
  Flocculation.deleteMany({})
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

// Find all published Flocculations
exports.findAllPublished = (req, res) => {};

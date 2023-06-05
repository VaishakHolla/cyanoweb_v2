const db = require("../models");
const CombinedCFS = db.combinedcfs;
const CustomError = require('../utils/customerror');
// Create and Save a new CombinedCFS
exports.create = (req, res) => {
    // console.log(req.body)
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const combinedcfs = new CombinedCFS({
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
        coagulant_type:req.body.coagulant_type,
        coagulant_manufacturer: req.body.coagulant_manufacturer, //inputText
        coagulant_chemical_dosage: req.body.coagulant_chemical_dosage, //inputNumber
        coagulant_mixing_speed: req.body.coagulant_mixing_speed, //inputNumber
        coagulant_reaction_time: req.body.coagulant_reaction_time, //
        coagulant_reaction_unit: req.body.coagulant_reaction_unit, //dropdown [Min,Sec]

        flocculant_type:req.body.flocculant_type,
        flocculant_manufacturer: req.body.flocculant_manufacturer, //inputText
        flocculant_chemical_dosage: req.body.flocculant_chemical_dosage, //inputNumber
        flocculant_mixing_speed: req.body.flocculant_mixing_speed, //inputNumber
        flocculant_reaction_time: req.body.flocculant_reaction_time, //
        flocculant_reaction_unit: req.body.flocculant_reaction_unit, //dropdown [Min,Sec]
          
        sedimentation_reaction_time: req.body.sedimentation_reaction_time, //
        sedimentation_reaction_unit: req.body.sedimentation_reaction_unit, //dropdown [Min,Sec]
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
  combinedcfs
    .save(combinedcfs)
    .then((data) => {
      res.send({
        message:"CombinedCFS successfully created",
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
    res.json({ message: "CombinedCFS working." });
}

// Retrieve all CombinedCFSs from the database.
exports.findAll = (req, res) => {
    // console.log("Here")
    CombinedCFS.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving CombinedCFS."
      });
    });
};

// Find a single CombinedCFS with an id
exports.findOne = (req, res) => {
  const source = req.body.source;
  // console.log(req.body)
  CombinedCFS.find({'basic_information.source':source})
    .then(data => {
      // console.log(data)
      if (!data)
        res.status(404).send({ message: "CombinedCFS not found with id " + source });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving CombinedCFS with id=" + source });
    });
};
// Update a CombinedCFS by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty"
    });
  }

  const id = req.params.id;

  CombinedCFS.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update CombinedCFS with id=${id}. Maybe CombinedCFS was not found!`
        });
      } else res.send({ message: "CombinedCFS was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating CombinedCFS with id=" + id
      });
    });
};
// Delete a CombinedCFS with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;
  CombinedCFS.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete CombinedCFS with id=${id}. Maybe CombinedCFS was not found!`,
        });
      } else {
        res.send({
          message: "CombinedCFS was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete CombinedCFS with id=" + id,
      });
    });
};


// Delete all CombinedCFSs from the database.
exports.deleteAll = (req, res) => {
  CombinedCFS.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} CombinedCFSs were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all CombinedCFSs."
      });
    });
};


// Find all published CombinedCFSs
exports.findAllPublished = (req, res) => {};

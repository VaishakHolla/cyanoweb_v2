const db = require("../models");
const Sedimentation = db.sedimentation;

// Create and Save a new Sedimentation
exports.create = (req, res) => {
    // console.log(req.body)
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const sedimentation = new Sedimentation({
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
        // chemical_type: req.body.chemical_type, //dropdown
        // other_chemical_type: req.body.other_chemical_type, //inputText
        // manufacturer: req.body.manufacturer, //inputText
        // chemical_dosage: req.body.chemical_dosage, //inputNumber
        // mixing_speed: req.body.mixing_speed, //inputNumber
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
  sedimentation
    .save(sedimentation)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sedimentation.",
      });
    });
};

exports.test =(req,res)=>{
    res.json({ message: "Sedimentation working." });
}

// Retrieve all Sedimentations from the database.
exports.findAll = (req, res) => {
    Sedimentation.find()
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

// Find a single Sedimentation with an id
exports.findOne = (req, res) => {
  const source = req.body.source;
  // console.log(source)
  Sedimentation.find({'basic_information.source':source})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Sedimentation not found with id " + source });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Sedimentation with id=" + source });
    });
};

// Update a Sedimentation by the id in the request
exports.update = (req, res) => {};

// Delete a Sedimentation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;
  Sedimentation.findByIdAndRemove(id)
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

// Delete all Sedimentations from the database.
exports.deleteAll = (req, res) => {
  Sedimentation.deleteMany({})
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

// Find all published Sedimentations
exports.findAllPublished = (req, res) => {};

const db = require("../models");
const Coagulation = db.coagulation;
const Flocculation = db.flocculation;
const Sedimentation = db.sedimentation;

exports.search = (req,res)=>{
    const source = req.params.source;
    Coagulation.find({source:source})
    let returnObj = {coagulation:[],flocculation:[],sedimentation:[]}
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Coagulation not found with source " + source });
      else returnObj.coagulation=data;
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Coagulation with source " + source });
    });
    Flocculation.find({source:source})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Flocculation not found with source " + source });
      else returnObj.flocculation=data;
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Flocculation with source " + source });
    });
    Sedimentation.find({source:source})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Sedimentation not found with id " + source });
      else returnObj.sedimentation=data
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Sedimentation with id=" + source });
    });

    console.log(returnObj)
    res.send(returnObj)
}
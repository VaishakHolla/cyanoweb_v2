const db = require("../models");
const Coagulation = db.coagulation;
const Flocculation = db.flocculation;
const Sedimentation = db.sedimentation;

exports.search = (req,res)=>{
    const source = req.body.source;
    const coagulant = req.body.coagulant
    const flocculant = req.body.flocculant
    let returnObj = {coagulation:[],flocculation:[],sedimentation:[]}
    Coagulation.find({'basic_information.source':source,'experimental_conditions.chemical_type':coagulant})
    .then(data => {
        // console.log(data)
      if (!data)
        res.status(404).send({ message: "Coagulation not found with source " + source });
      else returnObj.coagulation=data;console.log(returnObj,"after coag")
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Coagulation with source " + source });
    });
    console.log(returnObj)
    Flocculation.find({'basic_information.source':source,'experimental_conditions.chemical_type':flocculant})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Flocculation not found with source " + source });
      else returnObj.flocculation=data;console.log(returnObj,"after flocc")
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Flocculation with source " + source });
    });
    Sedimentation.find({'basic_information.source':source})
    .then(data => {
        // console.log(returnObj,"sed")
      if (!data)
        res.status(404).send({ message: "Sedimentation not found with id " + source });
      else returnObj.sedimentation=data;console.log(returnObj,"after sed");res.send(returnObj)
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Sedimentation with id=" + source });
    });

    // console.log(returnObj)
    // res.send(returnObj)
}
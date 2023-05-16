const db = require("../models");
const Coagulation = db.coagulation;
const Flocculation = db.flocculation;
const Sedimentation = db.sedimentation;

exports.search = async(req,res)=>{
    try{
    const source = req.query.source;
    const coagulant = req.query.coagulant
    const flocculant = req.query.flocculant
    const parameter = req.query.parameter
    console.log(req.query)
    const coagulationObj= await Coagulation.find({'basic_information.source':source,'experimental_conditions.chemical_type':coagulant})
    // .then(data => {
    //     // console.log(data)
    //   if (!data)
    //     res.status(404).send({ message: "Coagulation not found with source " + source });
    //   else returnObj.coagulation=data;console.log(returnObj,"after coag")
    // })
    // .catch(err => {
    //   res
    //     .status(500)
    //     .send({ message: "Error retrieving Coagulation with source " + source });
    // });
    // console.log(returnObj)
    const flocculationObj= await Flocculation.find({'basic_information.source':source,'experimental_conditions.chemical_type':flocculant})
    // .then(data => {
    //   if (!data)
    //     res.status(404).send({ message: "Flocculation not found with source " + source });
    //   else returnObj.flocculation=data;console.log(returnObj,"after flocc")
    // })
    // .catch(err => {
    //   res
    //     .status(500)
    //     .send({ message: "Error retrieving Flocculation with source " + source });
    // });
    const sedimentationObj = await Sedimentation.find({'basic_information.source':source})
    // .then(data => {
    //     // console.log(returnObj,"sed")
    //   if (!data)
    //     res.status(404).send({ message: "Sedimentation not found with id " + source });
    //   else returnObj.sedimentation=data;console.log(returnObj,"after sed");res.send(returnObj)
    // })
    // .catch(err => {
    //   res
    //     .status(500)
    //     .send({ message: "Error retrieving Sedimentation with id=" + source });
    // });
    // console.log(coagulationObj,flocculationObj,sedimentationObj)
    // console.log("_______________")
    // console.log("Coagulation",
    // coagulationObj,
    // coagulationObj[0].experimental_conditions.water_temperature,
    // coagulationObj[0].experimental_conditions.water_pH,
    // coagulationObj[0].experimental_conditions.chemical_type,
    // coagulationObj[0].experimental_conditions.chemical_dosage,
    // coagulationObj[0].experimental_conditions.mixing_speed,
    // coagulationObj[0].experimental_conditions.reaction_time,
    // coagulationObj[0].experimental_results.turbidity_removal,
    // coagulationObj[0].experimental_results.totalMicrocystis_removal,
    // coagulationObj[0].experimental_results.mcyeMicrocystis_removal,
    // coagulationObj[0].experimental_results.mycePlanktothrix_removal,
    // coagulationObj[0].experimental_results.totalMicrocystins_removal
    // )
    // console.log("_______________")
    // console.log("Flocculation",
    // flocculationObj,
    // flocculationObj[0].experimental_conditions.water_temperature,
    // flocculationObj[0].experimental_conditions.water_pH,
    // flocculationObj[0].experimental_conditions.chemical_type,
    // flocculationObj[0].experimental_conditions.chemical_dosage,
    // flocculationObj[0].experimental_conditions.mixing_speed,
    // flocculationObj[0].experimental_conditions.reaction_time,
    // flocculationObj[0].experimental_results.turbidity_removal,
    // flocculationObj[0].experimental_results.totalMicrocystis_removal,
    // flocculationObj[0].experimental_results.mcyeMicrocystis_removal,
    // flocculationObj[0].experimental_results.mycePlanktothrix_removal,
    // flocculationObj[0].experimental_results.totalMicrocystins_removal
    // )
    // console.log("_______________")

    // console.log("Sedimentation",
    // sedimentationObj,
    // sedimentationObj[0].experimental_conditions.water_temperature,
    // sedimentationObj[0].experimental_conditions.water_pH,
    // sedimentationObj[0].experimental_conditions.reaction_time,
    // sedimentationObj[0].experimental_results.turbidity_removal,
    // sedimentationObj[0].experimental_results.totalMicrocystis_removal,
    // sedimentationObj[0].experimental_results.mcyeMicrocystis_removal,
    // sedimentationObj[0].experimental_results.mycePlanktothrix_removal,
    // sedimentationObj[0].experimental_results.totalMicrocystins_removal
    // )
    // console.log("_______________")
    // console.log("_______________")
    // console.log("_______________")


    const combinedData = [];
    // const dates = new Set([...coagulationObj.map(item => item.basic_information.date), ...flocculationObj.map(item => item.basic_information.date), ...sedimentationObj.map(item => item.basic_information.date)]);
    // console.log(dates)
    // for (const date of dates) {
    //   const combinedItem = {
    //     coagulation: coagulationObj.find(obj => obj.basic_information.date === date),
    //     coagulation_flocculation: flocculationObj.find(obj => obj.basic_information.date === date),
    //     coagulation_flocculation_sedimentation: sedimentationObj.find(obj => obj.basic_information.date === date),
    //   };
    //   combinedData.push(combinedItem);
    // }
    for (const item1 of coagulationObj) {
        const date = item1.basic_information.date.toISOString();
        const flocculationItem = findDataByDate(flocculationObj,date)
        const sedimentationItem = findDataByDate(sedimentationObj,date)
        combinedData.push( {
          coagulation: {
            "waterTemperature": item1.experimental_conditions.water_temperature,
            "waterpH": item1.experimental_conditions.water_pH,
            "chemicalType": item1.experimental_conditions.chemical_type,
            "chemicalDosage": item1.experimental_conditions.chemical_dosage,
            "chemicalSpeed": item1.experimental_conditions.mixing_speed,
            "reactionTime": item1.experimental_conditions.reaction_time + item1.experimental_conditions.reaction_unit,
            "turbidityRemoval": item1.experimental_results.turbidity_removal,
            "totalMicrocystisRemoval": item1.experimental_results.totalMicrocystis_removal,
            "mcyEMicrocystisRemoval": item1.experimental_results.mcyeMicrocystis_removal,
            "mcyEPlanktothrixRemoval": item1.experimental_results.mycePlanktothrix_removal,
            "totalMiocrocystinsRemoval": item1.experimental_results.totalMicrocystins_removal
        },
          coagulation_flocculation: {
            "waterTemperature": flocculationItem.experimental_conditions.water_temperature,
            "waterpH": flocculationItem.experimental_conditions.water_pH,
            "chemicalType": flocculationItem.experimental_conditions.chemical_type,
            "chemicalDosage": flocculationItem.experimental_conditions.chemical_dosage,
            "chemicalSpeed": flocculationItem.experimental_conditions.mixing_speed,
            "reactionTime": flocculationItem.experimental_conditions.reaction_time + flocculationItem.experimental_conditions.reaction_unit,
            "turbidityRemoval": flocculationItem.experimental_results.turbidity_removal,
            "totalMicrocystisRemoval": flocculationItem.experimental_results.totalMicrocystis_removal,
            "mcyEMicrocystisRemoval": flocculationItem.experimental_results.mcyeMicrocystis_removal,
            "mcyEPlanktothrixRemoval": flocculationItem.experimental_results.mycePlanktothrix_removal,
            "totalMiocrocystinsRemoval": flocculationItem.experimental_results.totalMicrocystins_removal
          },
          coagulation_flocculation_sedimentation: {
            "waterTemperature": sedimentationItem.experimental_conditions.water_temperature,
            "waterpH": sedimentationItem.experimental_conditions.water_pH,
            "reactionTime": sedimentationItem.experimental_conditions.reaction_time + sedimentationItem.experimental_conditions.reaction_unit,
            "turbidityRemoval": sedimentationItem.experimental_results.turbidity_removal,
            "totalMicrocystisRemoval": sedimentationItem.experimental_results.totalMicrocystis_removal,
            "mcyEMicrocystisRemoval": sedimentationItem.experimental_results.mcyeMicrocystis_removal,
            "mcyEPlanktothrixRemoval": sedimentationItem.experimental_results.mycePlanktothrix_removal,
            "totalMiocrocystinsRemoval": sedimentationItem.experimental_results.totalMicrocystins_removal
          }
        });
      }
    function findDataByDate(arr, date) {
        return arr.find(item => item.basic_information.date.toISOString() === date)?.toObject();
      }
    res.send(combinedData)
    console.log(coagulationObj,flocculationObj,sedimentationObj)
    // if(!coagulationObj.length | !flocculationObj.length |!sedimentationObj.length){
    //     res.status(404).send({message:"Coagulation or Flocculation or Sedimentation data is empty try again after adding more data points"})
    // }

    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    // console.log(returnObj)
    // res.send(returnObj)
}
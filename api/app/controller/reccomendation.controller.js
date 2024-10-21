const db = require("../models");
const Coagulation = db.coagulation;
const Flocculation = db.flocculation;
const Sedimentation = db.sedimentation;
const CombinedCFS = db.combinedcfs;

exports.search = async(req,res)=>{
    try{
    const source = req.query.source;
    const coagulant = req.query.coagulant
    const flocculant = req.query.flocculant
    const parameter = req.query.parameter
    console.log(req.query)
    // const coagulationObj= await Coagulation.find({'basic_information.source':source,'experimental_conditions.chemical_type':coagulant})
    // const flocculationObj= await Flocculation.find({'basic_information.source':source,'experimental_conditions.chemical_type':flocculant})
    // const sedimentationObj = await Sedimentation.find({'basic_information.source':source})
    const combinedCFSObj = await CombinedCFS.find({'basic_information.source':source,'experimental_conditions.coagulant_type':coagulant,'experimental_conditions.flocculant_type':flocculant})
    // console.log(combinedCFSObj,"COMBINED CFS")
    const combinedData = [];
    // for (const item1 of coagulationObj) {
    //     const date = item1.basic_information.date.toISOString();
    //     const dosage = item1.experimental_conditions.chemical_dosage
    //     const flocculationItem = findDataByDateDosage(flocculationObj,date,dosage)
    //     const sedimentationItem = findDataByDate(sedimentationObj,date)
    //     combinedData.push( {
    //       coagulation: {
    //         "waterTemperature": item1.experimental_conditions.water_temperature,
    //         "waterpH": item1.experimental_conditions.water_pH,
    //         "chemicalType": item1.experimental_conditions.chemical_type,
    //         "chemicalDosage": item1.experimental_conditions.chemical_dosage,
    //         "chemicalSpeed": item1.experimental_conditions.mixing_speed,
    //         "reactionTime": item1.experimental_conditions.reaction_time + item1.experimental_conditions.reaction_unit,
    //         "turbidityRemoval": item1.experimental_results.turbidity_removal,
    //         "totalMicrocystisRemoval": item1.experimental_results.totalMicrocystis_removal,
    //         "mcyEMicrocystisRemoval": item1.experimental_results.mcyeMicrocystis_removal,
    //         "mcyEPlanktothrixRemoval": item1.experimental_results.mycePlanktothrix_removal,
    //         "totalMiocrocystinsRemoval": item1.experimental_results.totalMicrocystins_removal
    //     },
    //       coagulation_flocculation: {
    //         "waterTemperature": flocculationItem.experimental_conditions.water_temperature,
    //         "waterpH": flocculationItem.experimental_conditions.water_pH,
    //         "chemicalType": flocculationItem.experimental_conditions.chemical_type,
    //         "chemicalDosage": flocculationItem.experimental_conditions.chemical_dosage,
    //         "chemicalSpeed": flocculationItem.experimental_conditions.mixing_speed,
    //         "reactionTime": flocculationItem.experimental_conditions.reaction_time + flocculationItem.experimental_conditions.reaction_unit,
    //         "turbidityRemoval": flocculationItem.experimental_results.turbidity_removal,
    //         "totalMicrocystisRemoval": flocculationItem.experimental_results.totalMicrocystis_removal,
    //         "mcyEMicrocystisRemoval": flocculationItem.experimental_results.mcyeMicrocystis_removal,
    //         "mcyEPlanktothrixRemoval": flocculationItem.experimental_results.mycePlanktothrix_removal,
    //         "totalMiocrocystinsRemoval": flocculationItem.experimental_results.totalMicrocystins_removal
    //       },
    //       coagulation_flocculation_sedimentation: {
    //         "waterTemperature": sedimentationItem.experimental_conditions.water_temperature,
    //         "waterpH": sedimentationItem.experimental_conditions.water_pH,
    //         "reactionTime": sedimentationItem.experimental_conditions.reaction_time + sedimentationItem.experimental_conditions.reaction_unit,
    //         "turbidityRemoval": sedimentationItem.experimental_results.turbidity_removal,
    //         "totalMicrocystisRemoval": sedimentationItem.experimental_results.totalMicrocystis_removal,
    //         "mcyEMicrocystisRemoval": sedimentationItem.experimental_results.mcyeMicrocystis_removal,
    //         "mcyEPlanktothrixRemoval": sedimentationItem.experimental_results.mycePlanktothrix_removal,
    //         "totalMiocrocystinsRemoval": sedimentationItem.experimental_results.totalMicrocystins_removal
    //       }
    //     });
    //   }
    // function findDataByDateDosage(arr, date,dosage) {
    //     return arr.find(item => item.experimental_conditions.chemical_dosage ===dosage&& item.basic_information.date.toISOString() === date)?.toObject();
    //   }
    //   function findDataByDate(arr, date) {
    //     return arr.find(item => item.basic_information.date.toISOString() === date)?.toObject();
    //   }
    const groupedData = combinedCFSObj.reduce((result, entry) => {
      const experimentId = entry.basic_information.experiment_id;
  
      if (!result[experimentId]) {
        result[experimentId] = {
          common: {
            experiment_id: experimentId,
            date:entry.basic_information.date,
            source: entry.basic_information.source,
            water_pH: entry.experimental_conditions.water_pH,
            water_temperature: entry.experimental_conditions.water_temperature,
            coagulant_chemical_dosage:entry.experimental_conditions.coagulant_chemical_dosage,
            coagulant_manufacturer:entry.experimental_conditions.coagulant_manufacturer,
            coagulant_mixing_speed:entry.experimental_conditions.coagulant_mixing_speed,
            coagulant_reaction_time:entry.experimental_conditions.coagulant_reaction_time,
            coagulant_reaction_unit:entry.experimental_conditions.coagulant_reaction_unit,
            coagulant_type:entry.experimental_conditions.coagulant_type,
            sedimentation_reaction_time:entry.experimental_conditions.sedimentation_reaction_time,
            sedimentation_reaction_unit:entry.experimental_conditions.sedimentation_reaction_unit
            // Add more common properties as needed
          },
          flocculant_data: [],
        };
      }
  
      const flocculantDosage = entry.experimental_conditions.flocculant_chemical_dosage;
      const existingEntry = result[experimentId].flocculant_data.find(
        entry => entry.flocculant_chemical_dosage === flocculantDosage
      );
  
      if (!existingEntry) {
        result[experimentId].flocculant_data.push({
          flocculant_chemical_dosage: flocculantDosage,
          flocculant_manufacturer:entry.experimental_conditions.flocculant_manufacturer, 
          flocculant_mixing_speed:entry.experimental_conditions.flocculant_mixing_speed, 
          flocculant_reaction_time:entry.experimental_conditions.flocculant_reaction_time,
          flocculant_reaction_unit:entry.experimental_conditions.flocculant_reaction_unit,
          flocculant_type:entry.experimental_conditions.flocculant_type,
          results: [],
        });
      }
  
      const flocculantEntry = result[experimentId].flocculant_data.find(
        entry => entry.flocculant_chemical_dosage === flocculantDosage
      );
      flocculantEntry.results.push(entry.experimental_results);
  
      return result;
    }, {});
    //   if (!result[experimentId].flocculant_data[flocculantDosage]) {
    //     result[experimentId].flocculant_data[flocculantDosage] = {
    //       flocculant_chemical_dosage: flocculantDosage,
    //       flocculant_manufacturer:entry.experimental_conditions.flocculant_manufacturer, 
    //       flocculant_mixing_speed:entry.experimental_conditions.flocculant_mixing_speed, 
    //       flocculant_reaction_time:entry.experimental_conditions.flocculant_reaction_time,
    //       flocculant_reaction_unit:entry.experimental_conditions.flocculant_reaction_unit,
    //       flocculant_type:entry.experimental_conditions.flocculant_type,
    //       results: [],
    //     };
    //   }
  
    //   result[experimentId].flocculant_data[flocculantDosage].results.push(entry.experimental_results);
  
    //   return result;
    // }, {});
  
    // Convert the grouped data to an array of objects
    const consolidatedArray = Object.values(groupedData);
  
    
    res.send(consolidatedArray)
    // console.log(coagulationObj,flocculationObj,sedimentationObj)
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
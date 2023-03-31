import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import RecommendationChart from "./RecommendationChart";
import data from "./data.json";
import RecommendationScatter from "./RecommendationScatter";
import SedimentationScatter from "./SedimentationScatter";
const Recommendations = () => {
  const sourceOptions = [
    { name: "Lake Erie", code: "LE" },
    { name: "Grand Lake St. Marys", code: "GM" },
    { name: "Ohio River", code: "OR" },
  ];
  const parameterOptions = [
    { name: "Turbidity", code: "TURB" },
    { name: "Total Microcystis", code: "TMCS" },
    { name: "mcye Microcystis", code: "MMCS" },
    { name: "myce Planktothrix", code: "MPTX" },
    { name: "Total Microcystins", code: "TMCN" },
  ];
  const coagulantOptions = [
    { name: "Aluminum sulfate", code: "AS" },
    { name: "Ferric chloride", code: "FC" },
    { name: "Polyaluminum chloride", code: "PC" },
  ];
  const flocculantOptions = [
    { name: "Polyethylene oxide", code: "PO" },
    { name: "PolyDADMAC", code: "PD" },
    { name: "Sodium polyacrylate", code: "SP" },
  ];

  const removalLabels = [
    "turbidityRemoval",
    "totalMicrocystisRemoval",
    "mcyEMicrocystisRemoval",
    "mcyEPlanktothrixRemoval",
    "totalMiocrocystinsRemoval",
  ];

  function formatData(dataObj) {
    let coagulationData = {
      turbidityRemoval: [],
      totalMicrocystisRemoval: [],
      mcyEMicrocystisRemoval: [],
      mcyEPlanktothrixRemoval: [],
      totalMiocrocystinsRemoval: [],
    };
    let flocullationData = {
      turbidityRemoval: [],
      totalMicrocystisRemoval: [],
      mcyEMicrocystisRemoval: [],
      mcyEPlanktothrixRemoval: [],
      totalMiocrocystinsRemoval: [],
    };
    let sedimentationData = {
      turbidityRemoval: [],
      totalMicrocystisRemoval: [],
      mcyEMicrocystisRemoval: [],
      mcyEPlanktothrixRemoval: [],
      totalMiocrocystinsRemoval: [],
    };
    dataObj.map((obj) => {
      removalLabels.map((removalObj) => {
        coagulationData[removalObj].push({
          y: obj.coagulation[removalObj],
          x: obj.coagulation.chemicalDosage,
        });

        flocullationData[removalObj].push({
          y: obj.coagulation_flocculation[removalObj],
          x: obj.coagulation_flocculation.chemicalDosage,
        });
        sedimentationData[removalObj].push({
          y: obj.coagulation_flocculation_sedimentaion[removalObj],
          x: Number(
            obj.coagulation_flocculation_sedimentaion.reactionTime.split(
              "Min"
            )[0]
          ),
        });
      });
    });
    return [coagulationData, flocullationData, sedimentationData];
  }
  //   console.log(formatData(data),"hekkk")
  let [coagulationData, flocullationData, sedimentationData] = formatData(data);

  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedParameter, setSelectedParameter] = useState(null);
  const [selectedCoagulant, setSelectedCoagulant] = useState(null);
  const [selectedFlocculant, setSelectedFlocculant] = useState(null);

  const handleClick = () => {
    console.log(
      selectedSource,
      selectedParameter,
      selectedCoagulant,
      selectedFlocculant
    );
  };

  return (
    <div>
      <Dropdown
        value={selectedSource}
        options={sourceOptions}
        optionLabel="name"
        onChange={(e) => setSelectedSource(e.value)}
        placeholder="Select a Source"
      />

      <Dropdown
        value={selectedParameter}
        options={parameterOptions}
        optionLabel="name"
        onChange={(e) => setSelectedParameter(e.value)}
        placeholder="Select a Parameter"
      />

      <Dropdown
        value={selectedCoagulant}
        options={coagulantOptions}
        optionLabel="name"
        onChange={(e) => setSelectedCoagulant(e.value)}
        placeholder="Select a Coagulant"
      />

      <Dropdown
        value={selectedFlocculant}
        options={flocculantOptions}
        optionLabel="name"
        onChange={(e) => setSelectedFlocculant(e.value)}
        placeholder="Select a Flocculant"
      />

      <Button
        label="Submit"
        type="button"
        icon="pi pi-search"
        onClick={handleClick}
      />
      {removalLabels.map((obj) => {
        return (
          <>
            {/* <RecommendationChart
            data={{
              coagulationData: data.coagulation[obj],
              sedimentationData:
                data.coagulation_flocculation_sedimentaion[obj],
              flocculationData: data.coagulation_flocculation[obj],
              datasetLabel:data.coagulation.chemicalDosage,
              x_label:obj,
              y_label:"Removal"
            }}
          /> */}
            {/* {console.log(coagulationData[obj],obj)} */}
            <div className="grid">
              <div className="col-6">
                <RecommendationScatter
                  data={{
                    coagulationData: coagulationData[obj],
                    sedimentationData: sedimentationData[obj],
                    flocculationData: flocullationData[obj],
                    //   datasetLabel:chemicalDosage,
                    y_label: obj,
                    x_label: "Chemical dosage (mg/L)",
                  }}
                />
              </div>
              <div className="col-6">
                <SedimentationScatter
                  data={{
                    coagulationData: coagulationData[obj],
                    sedimentationData: sedimentationData[obj],
                    flocculationData: flocullationData[obj],
                    //   datasetLabel:chemicalDosage,
                    y_label: obj,
                    x_label: "Chemical dosage (mg/L)",
                  }}
                />
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Recommendations;

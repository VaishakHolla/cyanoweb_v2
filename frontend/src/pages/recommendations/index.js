import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import RecommendationChart from "./RecommendationChart";
import data from "./data.json";
import RecommendationScatter from "./RecommendationScatter";
import SedimentationScatter from "./SedimentationScatter";
import SedimentationLine from "./SedimentationLine";
import "./index.css";
const Recommendations = () => {
  const sourceOptions = [
    { name: "Lake Erie", code: "LE" },
    { name: "Grand Lake St. Marys", code: "GM" },
    { name: "Ohio River", code: "OR" },
  ];
  const parameterOptions = [
    { name: "Turbidity", code: "turbidityRemoval" },
    { name: "Total Microcystis", code: "totalMicrocystisRemoval" },
    { name: "mcye Microcystis", code: "mcyEMicrocystisRemoval" },
    { name: "myce Planktothrix", code: "mcyEPlanktothrixRemoval" },
    { name: "Total Microcystins", code: "totalMiocrocystinsRemoval" },
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
      turbidityRemoval: [{ x: 0, y: 0 }],
      totalMicrocystisRemoval: [{ x: 0, y: 0 }],
      mcyEMicrocystisRemoval: [{ x: 0, y: 0 }],
      mcyEPlanktothrixRemoval: [{ x: 0, y: 0 }],
      totalMiocrocystinsRemoval: [{ x: 0, y: 0 }],
    };
    let flocullationData = {
      turbidityRemoval: [{ x: 0, y: 0 }],
      totalMicrocystisRemoval: [{ x: 0, y: 0 }],
      mcyEMicrocystisRemoval: [{ x: 0, y: 0 }],
      mcyEPlanktothrixRemoval: [{ x: 0, y: 0 }],
      totalMiocrocystinsRemoval: [{ x: 0, y: 0 }],
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
          label: obj.coagulation_flocculation.chemicalDosage + "mg/L",
          showLine: true,
          data: [
            { x: 0, y: obj.coagulation_flocculation[removalObj] },
            {
              y: obj.coagulation_flocculation_sedimentation[removalObj],
              x: Number(
                obj.coagulation_flocculation_sedimentation.reactionTime.split(
                  "Min"
                )[0]
              ),
            },
          ],
        });
      });
    });
    [coagulationData, flocullationData, sedimentationData].map((dataObj) => {
      Object.keys(dataObj).map((obj) => {
        dataObj[obj] = dataObj[obj].sort((a, b) => a.x - b.x || a.y - b.y);
      });
    });
    // console.log(sedimentationData);

    // coagulationData.totalMiocrocystinsRemoval=coagulationData.totalMiocrocystinsRemoval.sort((a, b) => a.x - b.x||a.y-b.y)
    // flocullationData.totalMiocrocystinsRemoval=flocullationData.totalMiocrocystinsRemoval.sort((a, b) => a.x - b.x||a.y-b.y)
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

  const getExperimentalConditions = () => {
    return (
      <>
        <div className="card">
          <div>Temperature</div>
          <div>pH</div>
          <div>Coagulation speed</div>
          <div>Coagulation time</div>
          <div>Flocculation speed</div>
          <div>Flocculation time</div>
          <div>Sedimentation time</div>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="grid justify-content-center">
        <div style={{ margin: "10px" }}>
          <Dropdown
            value={selectedSource}
            options={sourceOptions}
            optionLabel="name"
            onChange={(e) => setSelectedSource(e.value)}
            placeholder="Select a Source"
          />
        </div>
        <div style={{ margin: "10px" }}>
          <Dropdown
            value={selectedParameter}
            options={parameterOptions}
            optionLabel="name"
            onChange={(e) => setSelectedParameter(e.value)}
            placeholder="Select a Parameter"
          />
        </div>
        <div style={{ margin: "10px" }}>
          <Dropdown
            value={selectedCoagulant}
            options={coagulantOptions}
            optionLabel="name"
            onChange={(e) => setSelectedCoagulant(e.value)}
            placeholder="Select a Coagulant"
          />
        </div>
        <div style={{ margin: "10px" }}>
          <Dropdown
            value={selectedFlocculant}
            options={flocculantOptions}
            optionLabel="name"
            onChange={(e) => setSelectedFlocculant(e.value)}
            placeholder="Select a Flocculant"
          />
        </div>
        <div style={{ margin: "10px" }}>
          <Button
            label="Search"
            type="button"
            icon="pi pi-search"
            onClick={handleClick}
            className="button"
          />
        </div>
      </div>
      {/* {getExperimentalConditions()} */}
      {/* {removalLabels.map((obj) => {
        return ( */}
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
                coagulationData: selectedParameter
                  ? coagulationData[selectedParameter.code]
                  : [],
                sedimentationData: selectedParameter
                  ? sedimentationData[selectedParameter.code]
                  : [],
                flocculationData: selectedParameter
                  ? flocullationData[selectedParameter.code]
                  : [],
                //   datasetLabel:chemicalDosage,
                y_label: selectedParameter ? selectedParameter.code : "",
                x_label: "Chemical dosage (mg/L)",
              }}
            />
          </div>
          {/* <div className="col-6">
                <SedimentationScatter
                  data={{
                    sedimentationData:  selectedParameter?sedimentationData[selectedParameter.code]:[],
                    y_label:  selectedParameter?selectedParameter.code:'',
                    // x_label: "Chemical dosage (mg/L)",
                  }}
                />
              </div> */}
          <div className="col-6">
            <SedimentationLine
              data={{
                sedimentationData: selectedParameter
                  ? sedimentationData[selectedParameter.code]
                  : [],
                y_label: selectedParameter ? selectedParameter.code : "",
              }}
            />
          </div>
        </div>
      </>
      {/* ); */}
      {/* })} */}
    </div>
  );
};

export default Recommendations;

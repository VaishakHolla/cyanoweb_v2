import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import Test from "./Test";
import MapComponent from "../rawwaterquality/MapComponent";
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
  
  
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedParameter, setSelectedParameter] = useState(null);
  const [selectedCoagulant, setSelectedCoagulant] = useState(null);
  const [selectedFlocculant, setSelectedFlocculant] = useState(null);


  const handleClick=()=>{
    console.log(selectedSource,selectedParameter,selectedCoagulant,selectedFlocculant)
  }

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

      {/* <Test/> */}
      {/* <MapComponent/> */}
    </div>
  );
};

export default Recommendations;

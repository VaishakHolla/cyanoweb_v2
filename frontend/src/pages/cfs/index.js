import React, { useState } from "react";
import Coagulation from "./Coagulation";
import Flocculation from "./Flocculation";
import Sedimentation from "./Sedimentation";
import { Button } from "primereact/button";

const CFS = () => {
  const [showSelect, setShowSelect] = useState('coagulation');
  const renderForm=()=>{
    switch(showSelect){
        case 'coagulation': return <Coagulation/>;break;
        case 'flocculation': return <Flocculation/>;break;
        case 'sedimentation': return <Sedimentation/>;break;
        case '': console.log("here empty");break;
        default : break;
    }
  }
  return (
    <div>
      <div className="grid align-inputs-center" style={{backgroundColor:'rgb(182,204,182)',margin:'1.75em'}}>
        <div className="col-4">
          <Button
            label="Coagulation"
            icon="pi "
            onClick={() => setShowSelect("coagulation")}
            className="button"
            style={{ minWidth: "20rem" }}
          />
        </div>
        <div className="col-4">
          <Button
            label="Flocculation"
            icon="pi "
            onClick={() => setShowSelect("flocculation")}
            className="button"
            style={{ minWidth: "20rem" }}
          />
        </div>
        <div className="col-4">
          <Button
            label="Sedimentation"
            icon="pi "
            onClick={() => setShowSelect("sedimentation")}
            className="button"
            style={{ minWidth: "20rem" }}
          />
        </div>
      </div>
      {renderForm()}
      {/* <Coagulation />
      <Flocculation />
      <Sedimentation /> */}
    </div>
  );
};

export default CFS;

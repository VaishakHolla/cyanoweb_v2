import React from 'react'
import Coagulation from './Coagulation'
import Flocculation from './Flocculation'
import Sedimentation from './Sedimentation'


const CFS = () => {
  return (
    <div>
        <Coagulation/>
        <Flocculation/>
        <Sedimentation/>        
    </div>
  )
}

export default CFS
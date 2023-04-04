import React from 'react'
import './index.css'
import { Image } from 'primereact/image';
import UCLogo from '../../assets/University_of_Cincinnati_logo.png'
import OSULogo from '../../assets/Ohio_State_Logo.png'
import ODHELogo from '../../assets/ODHE.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='grid'>
            <div className='col'>
            <Image src={UCLogo} />
            </div>
            <div className='col'>
                <Image src ={OSULogo} />
            </div>
            <div className='col'>
            <Image src ={ODHELogo} />
            </div>
        </div>
    </div>
  )
}

export default Footer
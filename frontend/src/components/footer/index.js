import React from 'react'
import './index.css'
import { Image } from 'primereact/image';
import UCLogo from '../../assets/University_of_Cincinnati_logo.png'
import OSULogo from '../../assets/Ohio_State_Logo.png'
import ODHELogo from '../../assets/ODHE.png'

const Footer = () => {
  return (
    <section className='footer'>
        <section className='footer-info'>
            <section className='footer-info-left'>
            <Image src={UCLogo} />
            </section>
            <section className='footer-info-center'>
                <Image src ={OSULogo} />
            </section>
            <section className='footer-info-right'>
            <Image src ={ODHELogo} />
            </section>
        </section>
    </section>
  )
}

export default Footer
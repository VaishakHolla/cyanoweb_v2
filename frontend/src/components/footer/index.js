import React from 'react'
import './index.css'

const Footer = () => {
  return (
    <section className='footer'>
        <hr className='footer-seperator'/>
        <section className='footer-social'>
            <a href="">Social</a>
        </section>
        <section className='footer-info'>
            <section className='footer-info-left'>
                Left
            </section>
            <section className='footer-info-center'>
                Center
            </section>
            <section className='footer-info-right'>
                Right
            </section>
        </section>
    </section>
  )
}

export default Footer
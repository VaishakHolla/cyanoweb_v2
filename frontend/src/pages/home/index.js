import React from 'react'
import background_img from '../../assets/Home_Background.jpeg'
const Home = () => {
    const homeText='Cyano WEB is a web infrastructure to help store and analyze water data related to CyanoHABs virtually.'
    return (
    <div style={{backgroundImage:`url(${background_img})`, backgroundRepeat: 'no-repeat',backgroundSize:'cover',height:'100vh',}}>
        <div className='grid'>
        <div className='col-6' style={{fontSize:'2.5em',margin:"50px"}}>{homeText}</div>
        </div>
        
    </div>
  )
}

export default Home
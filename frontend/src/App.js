import React from "react";
//theme
import "primereact/resources/themes/lara-light-teal/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";

import 'primeflex/primeflex.css';
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from "./pages/home";
import CFS from "./pages/cfs";
import About from "./pages/about";
import RawWaterQuality from "./pages/rawwaterquality";
import Recommendations from "./pages/recommendations";
import Resources from "./pages/resources";

import Navigation from "./components/navigation";
import Footer from "./components/footer";

function App() {
  return( 
    <div className="App">
      
      <BrowserRouter>
      <Navigation/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/rawwaterquality" element={<RawWaterQuality/>}/>
          <Route path="/recommendations" element={<Recommendations/>}/>
          <Route path="/cfs" element={<CFS/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/resources" element={<Resources/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    {/* <Counter /> */}
    </div>
  )
}

export default App;

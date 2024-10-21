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
import {BrowserRouter, Switch, Route,Link} from 'react-router-dom';

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
    <div className="App" style={{
      // backgroundColor: "#a0dcbc",
      // borderRadius: "15px",
    }}>
      
      <BrowserRouter basename="/cyanoweb">
      
      <Navigation/>

      {/* <Link to={"/"}>Home</Link>
            <Link to={"/rawwaterquality"}>rawwaterquality</Link>
            <Link to={"/recommendations"}>recommendations</Link>
            <Link to={"/cfs"}>cfs</Link>
            <Link to={"/about"}>about</Link> */}
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/rawwaterquality" component={RawWaterQuality}/>
          <Route path="/recommendations" component={Recommendations}/>
          <Route path="/cfs" component={CFS}/>
          <Route path="/about" component={About}/>
          <Route path="/resources" component={Resources}/>
          {/* <Route path="/" render={() => (
        <div className="test">
          Hello
        </div>
      )} /> */}
      </Switch> 
        <Footer/>
          
        </BrowserRouter>   
    {/* <Counter /> */}
    </div>
  )
}

export default App;

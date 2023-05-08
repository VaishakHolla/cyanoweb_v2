import React from "react";
import { Menubar } from "primereact/menubar";
import { NavLink as Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useHistory } from "react-router-dom";
import "./index.css";
const Navigation = () => {
    const history=useHistory();
    const navList = [
        { label: "Home", url: "/" },
        { label: "Raw Water Quality", url: "/rawwaterquality" },
    
        {
          label: "Treatment Options",
          items: [
            { label: "Coagulation, Flocculation, Sedimentation", url: "/cfs" },
            { label: "Membrane Filtration", url: "/cfs" },
            { label: "Activated Carbon Absorption", url: "/cfs" },
            { label: "Advanced Oxidation", url: "/cfs" },
          ],
        },
        { label: "Recommendations", url: "/recommendations" },
        
        { label: "Resources", url: "/resources" },
        { label: "Contact", url: "/about" },
        { label: "Logout" },
      ];
    const getMenuObject=(menu)=>{
       
        let menuObj={};

        menuObj.label=menu.label;

        if(menu.items){
           //if the navigation has items property then map each item and call itself again
            menuObj.items=menu.items.map(nestedItem=>{
                return getMenuObject(nestedItem);
            });  
        }

        if(menu.icon){
            menuObj.icon=menu.icon;
        }
        if(menu.url){
            menuObj.command=()=>{
               navigatePage(menu.url);
            }
        }
       
        return menuObj;
    }

    const navigationMenu=navList.map(menuItem=>{
        return getMenuObject(menuItem);
    })
    
    const navigatePage=(url)=>{
        history.push(url);
    }
  // const navigate = useNavigate();
 
  return (
    <div>
      <header>
        <nav>
          <Menubar model={navigationMenu} className="navbar" />
        </nav>
      </header>
    </div>
  );
};

export default Navigation;

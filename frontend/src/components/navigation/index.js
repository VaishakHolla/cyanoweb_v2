import React from "react";
import { Menubar } from "primereact/menubar";
import { NavLink as Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";
const Navigation = () => {
  // const navigate = useNavigate();
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
  return (
    <div>
      <header>
        <nav>
          <Menubar model={navList} className="navbar" />
        </nav>
      </header>
    </div>
  );
};

export default Navigation;

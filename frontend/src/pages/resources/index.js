import React from "react";
import { Image } from 'primereact/image';
import wrc from "../../assets/wrc.jpg";
import usgs from '../../assets/usgsimg.jpg';
const Resources = () => {
  const resources = [
    {
      image: usgs,
      redirectUrl:
        "https://waterdata.usgs.gov/nwis/current/?type=quality&group_key=state_cd&site_no_name_select=station_nm",
    },
    { image: wrc, redirectUrl: "https://highered.ohio.gov/" },
    { image: wrc, redirectUrl: "https://wrc.osu.edu/" },
  ];
  return <div>{resources.map(obj=>{
    return <a href={obj.redirectUrl} target="_blank">
        <Image src={obj.image} width="20%" height="10%"/>
    </a>
  })}</div>;
};

export default Resources;

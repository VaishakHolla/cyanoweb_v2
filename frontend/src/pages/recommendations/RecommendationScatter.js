import React, { useState } from "react";
import { Chart } from "primereact/chart";

const RecommendationScatter = (props) => {
  //   function transparentize(value, opacity) {
  //     var alpha = opacity === undefined ? 0.5 : 1 - opacity;
  //     return colorLib(value).alpha(alpha).rgbString();
  //   }
  // console.log(props,"recommendationscatter")

  const data = {
    datasets: [
      {
        label: "Coagulation",
        data: props.data.coagulationData,
        // data: [{x:5,y:6.7},{x:10,y:33.3},{x:7,y:8},{x:12,y:32}],
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        backgroundColor: "rgba(255,99,132,0.2)",
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        showLine: true,
        //   backgroundColor: transparentize('rgb(255, 99, 132)', 0.5),
      },
      {
        label: "Coagulation + Flocculation",
        data: props.data.flocculationData,
        borderColor: "rgb(255, 159, 64)",
        borderWidth: 2,
        showLine: true,
        //   backgroundColor: transparentize('rgb(255, 159, 64)', 0.5),
      },
    ],
  };
  const getLightTheme = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          min: 0,
          max: 10,
          title: {
            display: true,
            text: props.data.x_label,
          },
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          min: 0,
          max: 100,
          title: {
            display: true,
            text: "Removal %",
          },
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    return {
      basicOptions,
    };
  };

  const { basicOptions } = getLightTheme();

  return (
    <div>
      <div className="card">
        <h5>{props.data.y_label}</h5>
        <Chart type="scatter" data={data} options={basicOptions} />
      </div>
    </div>
  );
};

export default RecommendationScatter;

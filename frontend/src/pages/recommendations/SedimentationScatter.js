import React from "react";
import { Chart } from "primereact/chart";

const SedimentationScatter = (props) => {
  const data = {
    datasets: [
      {
        label: "Coagulation + Flocculation + Sedimentation",
        data: props.data.sedimentationData,
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        backgroundColor: "rgba(255,99,132,0.2)",
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        showLine: true,
        //   backgroundColor: transparentize('rgb(255, 99, 132)', 0.5),
      }
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
        tooltips: {
            mode: 'index',
            intersect: false
         },
         hover: {
            mode: 'index',
            intersect: false
         }
      },
      scales: {
        x: {
          min: 0,
          max: 60,
          title: {
            display: true,
            text: "Reaction time (minute)",
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

export default SedimentationScatter;

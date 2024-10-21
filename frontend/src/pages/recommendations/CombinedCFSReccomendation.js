import React, { useState } from "react";
import { Chart } from "primereact/chart";
import "./CombinedCFS.css"
const CombinedCFSReccomendation = ({ formattedData, selectedParameter, selectedCoagulant }) => {
    if (!selectedParameter || !formattedData || formattedData.length === 0) {
      return <div>No data available for the selected parameter.</div>;
    }
  
    const parameterCode = selectedParameter.code; // Extract the code from selectedParameter
  
    const chartData = formattedData.map(dataPoint => ({
      date: new Date(dataPoint.date).toLocaleDateString(),
      values: dataPoint.chartData[parameterCode].map(entry => entry.y),
    }));
  
    const chartLabels = formattedData[0]?.chartData[parameterCode].map(entry => entry.x) || [];
  
    const datasets = chartData.map(data => ({
      label: `${selectedParameter.name} (${data.date})`,
      data: data.values,
      borderColor: getRandomColor(),
      fill: false,
    }));
  
    const chartDataConfig = {
      labels: chartLabels,
      datasets: datasets,
    };
    
  
    const options = {
        maintainAspectRatio: false,
        responsive: true, 
        aspectRatio: .6,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: "Flocculant Dosage (mg/L)",
            font: {
                size: 24
              },
          },
          ticks: {
            color: "#495057",
            font: {
                size: 24, // Font size for X-axis tick labels
              },
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          min: 0,
          max: 100, // Adjust the max value as needed

          title: {
            display: true,
            text: "Removal %",
            font: {
                size: 24, // Font size for X-axis tick labels
              },
          },
          ticks: {
            color: "#495057",
            font: {
                size: 24, // Font size for X-axis tick labels
              },
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          font: {
            size: 24, // Font size for X-axis tick labels
          },
        },
      },
      elements: {
        point: {
          radius: 10, // Increase point size
        },
      },
    };

    
  
    return (
        <div className="card" style={{margin:"25px"}} >
        <h2>{selectedParameter.name}</h2>
        <div className="custom-legend">
        <span className="legend purple">{selectedCoagulant.name} = 10 mg/L</span>
        <span className="legend green">Settling Time = 30 mins</span>
      </div>
      <div className="chart-container ">
        <Chart type="line" data={chartDataConfig} options={options} />
        </div>
      </div>
    );
  };
  
  // Function to generate random colors
  const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    export default CombinedCFSReccomendation;

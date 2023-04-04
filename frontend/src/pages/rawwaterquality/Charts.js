// import React from 'react'

// import { Chart } from 'primereact/chart';
        
// const Charts = () => {
//   return (
//     <div>Charts</div>
//   )
// }

// export default Charts


import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function Charts(props) {
    const lineColor = props.lineColor
    // const data = props.data
    // const label = props.label
    
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const data = {
            labels: props.data.y_data,
            datasets: [
                {
                    label: props.data.dataset_label,
                    data: props.data.x_data,
                    fill: true,
                    borderColor: documentStyle.getPropertyValue(`--${lineColor}-500`),
                    tension: 0.4
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },scales: {
                x: {
                  title: {
                    display: true,
                    text: props.data.x_label,
                    color:"white"
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: props.data.y_label,
                    color:"white"
                  }
                }
              }     
        }
        ;

        setChartData(data);
        setChartOptions(options);
    }, [props.data]);

    return (
        <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    )
}
        
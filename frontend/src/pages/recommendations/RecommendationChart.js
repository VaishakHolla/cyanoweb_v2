import React, { useState } from 'react';
import { Chart } from 'primereact/chart';

const RecommendationChart = (props) => {
    // console.log(props.data.coagulationData,props.data.flocculationData,props.data.sedimentationData)
    const [basicData] = useState({
        labels: [0,props.data.datasetLabel,5],
        datasets: [
            {
                label: 'Coagulation',
                data: [0,props.data.coagulationData,null],
                fill: false,
                borderColor: '#42A5F5',
                // tension: .4
            },
            {
                label: 'Flocculation',
                data: [0,props.data.flocculationData,null],
                fill: false,
                borderColor: '#FFA726',
                // tension: .4
            },
            {
                label: 'Sedimentaion',
                data: [0,props.data.sedimentationData,40],
                fill: false,
                borderColor: '#CAFE69',
                // tension: .4,
                // backgroundColor: 'rgba(255,167,38,0.2)'
            }
        ]
    });


    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .6,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: props.data.x_label
                      },
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    title: {
                    display: true,
                    text: props.data.y_label
                  },
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        return {
            basicOptions,
        }
    }

    const { basicOptions } = getLightTheme();

    return (
        <div>
            <div className="card">
                <h5>{props.data.x_label}</h5>
                <Chart type="line" data={basicData} options={basicOptions} />
            </div>

        </div>
    )
}

export default RecommendationChart
import React,{ useState }  from 'react'
import { Chart } from 'primereact/chart';

const SedimentationLine = (props) => {
    // console.log(props)
    let dataset=[]
    props.data.sedimentationData.map(obj=>{
        dataset.push({
            label: obj.label,
            // data: props.data.,
            data: obj.data,
            // borderColor: "rgb(255, 99, 132)",
            // borderWidth: 2,
            // backgroundColor: "rgba(255,99,132,0.2)",
            // hoverBackgroundColor: "rgba(255,99,132,0.4)",
            // hoverBorderColor: "rgba(255,99,132,1)",
            showLine: true,
            //   backgroundColor: transparentize('rgb(255, 99, 132)', 0.5),
          })
    })
    const [basicData] = useState({
        // labels: [],
        // datasets: [
        //     {
        //         label: props.data.label,
        //         // data: props.data.,
        //         data: [{x:0,y:66.7},{x:30,y:90.0}],
        //         borderColor: "rgb(255, 99, 132)",
        //         borderWidth: 2,
        //         backgroundColor: "rgba(255,99,132,0.2)",
        //         hoverBackgroundColor: "rgba(255,99,132,0.4)",
        //         hoverBorderColor: "rgba(255,99,132,1)",
        //         showLine: true,
        //         //   backgroundColor: transparentize('rgb(255, 99, 132)', 0.5),
        //       },
        // ]
        datasets:dataset
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
                },
                datalabels: {
                    formatter: function(value, context) {
                        return context.dataIndex + ': ' +value ;
                    }
                }
            },
            scales: {
                x: {
                  min: 0,
                  max: 60,
                  title: {
                    display: true,
                    text: "Settling time (minute)",
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
        }
    }

    const { basicOptions } = getLightTheme();
  return (
    <div>
            <div className="card">
                <h5>{props.data.y_label}</h5>
                <Chart type="scatter" data={{datasets:props.data.sedimentationData}} options={basicOptions} />
            </div>

        </div>
  )
}

export default SedimentationLine
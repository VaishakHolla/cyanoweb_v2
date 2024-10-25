import React, { useEffect, useState } from "react";
import AddDataModal from "./AddDataModal";
import Charts from "./Charts";
import MapComponent from "./MapComponent";
import data from "./data.json";

import { useSelector,useDispatch } from "react-redux";
import {selectAllRawWaterData,fetchRawWaterData} from '../../features/rawwater/rawwaterSlice'
// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
//     iconUrl: require('leaflet/dist/images/marker-icon.png').default,
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
// });

const RawWaterQuality = () => {
  const apiData = data;
  const [selected, setSelected] = useState(null);
  const rawwaterDataFromAPI = useSelector(selectAllRawWaterData)
  console.log(rawwaterDataFromAPI,"REDUX RESPONSE???")
  const [data1, setData1] = useState([]);
  const uniqueLocations = [
    { name: "Lake Eerie", lat: -83.261389, long: 41.7019444 },
    { name: "Grand Lake St. Marys", lat: -84.573333, long: 40.5419444 },
    { name: "Ohio River", lat: -84.42019, long: 39.07379 },
  ];
  //need to maintain a constant file and import as constants for names that are used across like this for drop down
  const paramterLabels = [
    "Temperature (Degree Celsius)",
    "pH",
    "Dissolved Oxygen(mg/L)",
    "Turbidity(NTU)",
    "Total Microcystis(Log gene copies/L)",
    "mcyE Microcytis (Log gene copies/L)",
    "mcyE Planktothrix (Log gene copies/L)",
    "Total Microcytins (ppb)",
  ];
  const [turbidity,setTurbidity]=useState([])
  const [ph,setPh]=useState([])
  const [dissolvedOxygen,setDissolvedOxygen]=useState([])
  const [temperature,setTemperature]=useState([])
  const [totalMicrocystins,setTotalMicrocystins]=useState([])
  const [totalMicrocystis,setTotalMicrocystis]=useState([])
  const [mcyeMicrocystis,setMcyeMicrocystis]=useState([])
  const [mycePlanktothrix,setMycePlanktothrix]=useState([])
  const [date,setDate]=useState([])

  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(`${process.env.REACT_APP_API_BASE_URL}`)
    // fetch(`${process.env.REACT_APP_API_BASE_URL}/rawwaterdata/all`)
    //   .then(response =>response.json())
    //   .then(data => setData1(data))
    //   .catch(error => console.log(error));
    dispatch(fetchRawWaterData())
  }, []);
  // console.log(data1)
  const [templateData,setTemplateData] = useState({
    turbidity: [],
    ph: [],
    dissolvedoxygen: [],
    mcyemicrocytis: [],
    mcyeplanktothrix: [],
    temperature: [],
    totalmicrocystins: [],
    totalmicrocytis: [],
    date: [],
  });
  function compareLocation(obj) {
    // console.log(selected,"selected source")
    // let [obj_lat, obj_long] = obj.location.split(",");
    return (
    //   Number(obj_lat)===selected.long& Number(obj_long)===selected.lat
    obj.source === selected
    );
  }
  const formatData = (data) => {
    let parameters = [];
    let defaultData={
        turbidity: [],
        ph: [],
        dissolvedoxygen: [],
        mcyemicrocytis: [],
        mcyeplanktothrix: [],
        temperature: [],
        totalmicrocystins: [],
        totalmicrocytis: [],
        date: [],
      }
    if (selected !== null) {
        setTurbidity([])
        setDissolvedOxygen([])
        setTemperature([])
        setDate([])
        setMcyeMicrocystis([])
        setMycePlanktothrix([])
        setTotalMicrocystins([])
        setTotalMicrocystis([])
      let testData=  rawwaterDataFromAPI.filter((obj) => compareLocation(obj));

    testData.map((obj) => {
        defaultData.turbidity.push(obj.turbidity);
        defaultData.ph.push(obj.ph);
        defaultData.dissolvedoxygen.push(obj.dissolvedoxygen);
        defaultData.mcyemicrocytis.push(obj.mcyemicrocytis);
        defaultData.mcyeplanktothrix.push(obj.mcyeplanktothrix);
        defaultData.temperature.push(obj.temperature);
        defaultData.totalmicrocystins.push(obj.totalmicrocystins);
        defaultData.totalmicrocytis.push(obj.totalmicrocytis);
        defaultData.date.push(new Date(obj.date).toLocaleDateString());
      });
      // console.log(testData)
    //   setTemplateData(defaultData)
      setTurbidity(defaultData.turbidity)
      setDissolvedOxygen(defaultData.dissolvedoxygen)
      setTemperature(defaultData.temperature)
      setDate(defaultData.date)
      setPh(defaultData.ph)
      setMcyeMicrocystis(defaultData.mcyemicrocytis)
      setMycePlanktothrix(defaultData.mcyeplanktothrix)
      setTotalMicrocystins(defaultData.totalmicrocystins)
      setTotalMicrocystis(defaultData.totalmicrocytis)
    }
  };

//   useEffect(() => {
//     return () => {
//         console.log("here useeffect",selected)
//       formatData(apiData);
//     }
//   }, [selected])
  useEffect(() => {
    formatData(apiData)
  }, [selected]);

  const handleClick = (obj) => {
    // console.log(obj)
    setSelected(obj.name);
    formatData(apiData)
  };
  const defaultData = {
    x_label: "",
    y_label: "",
    dataset_label: "",
    data: [],
  };
  const defaultLabel = [];
  // console.log(paramterLabels)
  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [third])

  return (
    <div>
      <AddDataModal />
      <div className="grid">
        <div className="col-4">
          <MapComponent locations={uniqueLocations} handleClick={handleClick} />
        </div>
        <div className="col-8">
          <div className="grid">
            <div className="col-6">
              <Charts
                data={{
                  x_label: "Date",
                  y_label: paramterLabels[0],
                  dataset_label: paramterLabels[0],
                  x_data: temperature,
                  y_data: date,
                }}
                lineColor={"green"}
              />
            </div>
            <div className="col-6">
              <Charts
                data={{
                  x_label: "Date",
                  y_label: paramterLabels[1],
                  dataset_label: paramterLabels[1],
                  x_data: ph,
                  y_data: date,
                }}
                lineColor={"green"}
              />
            </div>
            <div className="col-6">
              <Charts
                data={{
                  x_label: "Date",
                  y_label: paramterLabels[2],
                  dataset_label: paramterLabels[2],
                  x_data: dissolvedOxygen,
                  y_data: date,
                }}
                lineColor={"green"}
              />
            </div>
            <div className="col-6">
              <Charts
                data={{
                  x_label: "Date",
                  y_label: paramterLabels[3],
                  dataset_label: paramterLabels[3],
                  x_data: totalMicrocystins,
                  y_data: date,
                }}
                lineColor={"green"}
              />
            </div>
            <div className="col-6">
              <Charts
                data={{
                  x_label: "Date",
                  y_label: paramterLabels[4],
                  dataset_label: paramterLabels[4],
                  x_data: totalMicrocystis,
                  y_data: date,
                }}
                lineColor={"green"}
              />
            </div>
            <div className="col-6">
              <Charts
                data={{
                  x_label: "Date",
                  y_label: paramterLabels[5],
                  dataset_label: paramterLabels[5],
                  x_data: mcyeMicrocystis,
                  y_data: date,
                }}
                lineColor={"green"}
              />
            </div>
            <div className="col-6">
              <Charts
                data={{
                  x_label: "Date",
                  y_label: paramterLabels[6],
                  dataset_label: paramterLabels[6],
                  x_data: mycePlanktothrix,
                  y_data: date,
                }}
                lineColor={"green"}
              />
            </div>
            <div className="col-6">
              <Charts
                data={{
                  x_label: "Date",
                  y_label: paramterLabels[7],
                  dataset_label: paramterLabels[7],
                  x_data: totalMicrocystins,
                  y_data: date,
                }}
                lineColor={"green"}
              />
            </div>

            <div className="col-6">
              {/* <Charts
                data={defaultData}
                label={defaultLabel}
                lineColor={"green"}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RawWaterQuality;

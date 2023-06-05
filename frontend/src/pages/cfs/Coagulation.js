import React, { useState, useRef, useEffect, useCallback } from "react";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import "./Coagulation.css";

const Coagulation = () => {
  // const [visible, setVisible] = useState(false);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const chemicaltypes =[
    {name:"Aluminum Sulfate",code:"AS"},
    {name:"Ferric Chloride",code:"FC"},
    {name:"Polyaluminum Chloride",code:"PC"},
    {name:"Other (Specify Below)",code:"OT"},
  ];
  const sources = [
    { name: "Lake Eerie", code:'LE'},
    { name: "Grand Lake St. Marys", code:'GL'},
    { name: "Ohio River", code:'OR'},
  ];
  const toast = useRef(null);

  const defaultValues = {
    source: "", //dropdown
    date: "", //calendar
    model: "", //inputText
    device: "", //inputText

    //Experimental Conditions
    waterTemperature: null, //inputNumber
    waterpH: null, //inputNumber
    chemicalType: "", //dropdown
    otherChemicalType: "", //inputText
    manufacturer: "", //inputText
    chemicalDosage: null, //inputNumber
    mixingSpeed: null, //inputNumber
    reactionTime: null, //
    reactionUnit: "", //dropdown [Min,Sec]

    //Experimental results
    turbidityInitial: null,
    turbidityFinal: null,
    turbidityRemoval: null,
    totalMicrocystisInitial: null,
    totalMicrocystisFinal: null,
    totalMicrocystisRemoval: null,
    mcyeMicrocystisInitial: null,
    mcyeMicrocystisFinal: null,
    mcyeMicrocystisRemoval: null,
    mycePlanktothrixInitial: null,
    mycePlanktothrixFinal: null,
    mycePlanktothrixRemoval: null,
    totalMicrocystinsInitial: null,
    totalMicrocystinsFinal: null,
    totalMicrocystinsRemoval: null,

    // temperature: "", //inputNumber
    // pH: "", //inputNumber
    // turbidity: "", //inputNumber
    // dissolvedOxygen: "", //inputNumber
    // totalMicrocystis: "", //inputNumber
    // mycEMicrocystis: "", //inputNumber
    // mycEPlanktothrix: "", //inputNumber
    // totalMicrocystins: "", //inputNumber
  };

  const {
    form,
    reset,
    control,
    handleSubmit,
    getValues,
    formState,
    clearErrors,
    setValue,
    formState: { isSubmitSuccessful },
    watch,
  } = useForm({ defaultValues });

  const errors = formState.errors;

  const watchTurbidity = watch(["turbidityFinal", "turbidityInitial"]);
  const watchTotalMicrocystis = watch([
    "totalMicrocystisFinal",
    "totalMicrocystisInitial",
  ]);
  const watchmcyeMicrocystis = watch([
    "mcyeMicrocystisFinal",
    "mcyeMicrocystisInitial",
  ]);
  const watchmycePlanktothrix = watch([
    "mycePlanktothrixFinal",
    "mycePlanktothrixInitial",
  ]);
  const watchtotalMicrocystins = watch([
    "totalMicrocystinsFinal",
    "totalMicrocystinsInitial",
  ]);

  useEffect(() => {
    // console.log("useeffect", watchTurbidity);
    // console.log(
    //   (watchTurbidity[0] != "") &
    //     (watchTurbidity[1] != "") &
    //     (getValues("turbidityRemoval") != watchTurbidity[1] - watchTurbidity[0])
    // );
    const interval = setTimeout(() => {
      if (
        (watchTurbidity[0] != "") &
        (watchTurbidity[1] != "") &
        (getValues("turbidityRemoval") != watchTurbidity[1] - watchTurbidity[0])
      ) {
        // console.log("inside if");
        setValue("turbidityRemoval", ((watchTurbidity[1] - watchTurbidity[0])/watchTurbidity[1])*100);
      }
      if (
        (watchTotalMicrocystis[0] != "") &
        (watchTotalMicrocystis[1] != "") &
        (getValues("totalMicrocystisRemoval") !=
          watchTotalMicrocystis[1] - watchTotalMicrocystis[0])
      ) {
        setValue(
          "totalMicrocystisRemoval",
          ((watchTotalMicrocystis[1] - watchTotalMicrocystis[0])/watchTotalMicrocystis[1])*100
        );
      }
      if (
        (watchmcyeMicrocystis[0] != "") &
        (watchmcyeMicrocystis[1] != "") &
        (getValues("mcyeMicrocystisRemoval") !=
          watchmcyeMicrocystis[1] - watchmcyeMicrocystis[0])
      ) {
        setValue(
          "mcyeMicrocystisRemoval",
          ((watchmcyeMicrocystis[1] - watchmcyeMicrocystis[0])/watchmcyeMicrocystis[1])*100
        );
      }
      if (
        (watchmycePlanktothrix[0] != "") &
        (watchmycePlanktothrix[1] != "") &
        (getValues("mycePlanktothrixRemoval") !=
          watchmycePlanktothrix[1] - watchmycePlanktothrix[0])
      ) {
        setValue(
          "mycePlanktothrixRemoval",
          ((watchmycePlanktothrix[1] - watchmycePlanktothrix[0])/watchmycePlanktothrix[1])*100
        );
      }
      if (
        (watchtotalMicrocystins[0] != "") &
        (watchtotalMicrocystins[1] != "") &
        (getValues("totalMicrocystinsRemoval") !=
          watchtotalMicrocystins[1] - watchtotalMicrocystins[0])
      ) {
        setValue(
          "totalMicrocystinsRemoval",
          ((watchtotalMicrocystins[1] - watchtotalMicrocystins[0])/watchtotalMicrocystins[1])*100
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [
    watchTurbidity,
    watchTotalMicrocystis,
    watchmcyeMicrocystis,
    watchmycePlanktothrix,
    watchtotalMicrocystins,
  ]);

  const show = () => {
    const date = new Date(getValues("date")).toLocaleDateString();
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: getValues("value"),
    });
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: getValues("calendar"),
    });
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: getValues("dropdown.name"),
    }); //Need to use .name for accessing the name of the dropdown object
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: date,
    });
  };

  const onSubmit = async(data,e) => {
    // data.value && show();
    // data.calendar && show();
    // data.dropdown && show();
    // console.log(e)
    e.preventDefault()
    // console.log(data);
    // data.date && show();
    const url = `${process.env.REACT_APP_API_BASE_URL}/coagulation`
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: data.model,
      device: data.device,
      date: data.date,
      source: data.source.name,
      experiment_id : data.experiment_id,

      water_temperature: data.waterTemperature, //inputNumber
      water_pH: data.waterpH, //inputNumber
      chemical_type: data.chemicalType.name, //dropdown
      other_chemical_type: data.otherChemicalType, //inputText
      manufacturer: data.manufacturer, //inputText
      chemical_dosage: data.chemicalDosage, //inputNumber
      mixing_speed: data.mixingSpeed, //inputNumber
      reaction_time: data.reactionTime, //
      reaction_unit: data.reactionUnit.name, //dropdown [Min,Sec]


      turbidity_initial: data.turbidityInitial,
      turbidity_final: data.turbidityFinal,
      turbidity_removal: data.turbidityRemoval,
      totalMicrocystis_initial: data.totalMicrocystisInitial,
      totalMicrocystis_final: data.totalMicrocystisFinal,
      totalMicrocystis_removal: data.totalMicrocystisRemoval,
      mcyeMicrocystis_initial: data.mcyeMicrocystisInitial,
      mcyeMicrocystis_final: data.mcyeMicrocystisFinal,
      mcyeMicrocystis_removal: data.mcyeMicrocystisRemoval,
      mycePlanktothrix_initial: data.mycePlanktothrixInitial,
      mycePlanktothrix_final: data.mycePlanktothrixFinal,
      mycePlanktothrix_removal: data.mycePlanktothrixRemoval,
      totalMicrocystins_initial: data.totalMicrocystinsInitial,
      totalMicrocystins_final: data.totalMicrocystinsFinal,
      totalMicrocystins_removal: data.totalMicrocystinsRemoval,
      })
    }).then(response => {
      if (!response.ok) {
        throw response.json().then(errorResponse => {
          const { message } = errorResponse;
          const error = new Error(message);
          error.response = errorResponse;
          toast.current.show({
            severity: "error",
            summary: message,
          });
          throw error;
        });
      }
      return response.json();
    })
    .then(data => {
      // Handle the successful response
      console.log(data,"data");
        toast.current.show({
        severity: "success",
        summary: data.message,
      });
      reset({...defaultValues});
      clearErrors(defaultValues)
    })
    .catch(error => {
      if (error.response) {
        // Backend error
        const { message } = error.response;
        console.error('Error:', message);
      } else {
        // Network or parsing error
        console.error('Error:', error.message);
      }
    });
  
    // const content = await rawResponse.json();
  
    // console.log(content);
    // reset({...defaultValues});
    // clearErrors(defaultValues)
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <Message severity="error" text={errors[name].message} />
    ) : (
      <></>
    );
  };

  const experimentalConditions = () => {
    return (
      <>
        <div className="justify-content-center">Experimental Conditions</div>
        <div className="align-form-inputs">
          <Controller
            name="waterTemperature"
            control={control}
            rules={{
              required: "Enter a valid waterTemperature.",
              validate: (value) =>
                (value >= 0 && value <= 30) ||
                "Enter a valid waterTemperature.",
            }}
            render={({ field, fieldState }) => (
              <div className="align-items-center" style={{ margin: "20px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    maxFractionDigits={5} 
                    min={0}
                    max={30}
                    // suffix=" ℃"
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />{" ℃"}
                  
                <label htmlFor={field.name} style={{color:"#070606"}}>Water Temperature</label>
                </span>
                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        <div className="align-form-inputs">
          <Controller
            name="waterpH"
            control={control}
            rules={{
              required: "Enter a valid waterpH.     ",
              validate: (value) =>
                (value >= 0 && value <= 14) || "Enter a valid waterpH.",
            }}
            render={({ field, fieldState }) => (
              <div className="align-items-center" style={{ margin: "20px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    maxFractionDigits={5} 
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                  
                <label htmlFor={field.name} style={{color:"#070606"}}>Water pH</label>
                </span>
                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        <div className="align-form-inputs">
          <Controller
            name="chemicalType"
            control={control}
            rules={{ required: "chemicalType is required." }}
            render={({ field, fieldState }) => (
              <div className=" align-items-center" style={{ margin: "20px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                
                  <Dropdown
                    value={field.value}
                    optionLabel="name"
                    placeholder="Select"
                    name={field.name}
                    options={chemicaltypes}
                    control={control}
                    onChange={(e) => field.onChange(e.value)}
                    style={{ width: "73%" }}
                    className={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                  <label htmlFor={field.name} style={{color:"#070606"}}>Chemical Type</label>
                </span>
                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        <div className="align-form-inputs">
          <Controller
            name="otherChemicalType"
            control={control}
            rules={{
              required: "Enter a valid otherChemicalType.",
            }}
            render={({ field, fieldState }) => (
              <div className="align-items-center" style={{ margin: "20px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames({ "p-invalid": fieldState.error })}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                <label htmlFor={field.name} style={{color:"#070606"}}>Other Chemical Type</label>  
                </span>

                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        <div className="align-form-inputs">
          <Controller
            name="manufacturer"
            control={control}
            rules={{
              required: "Enter a valid manufacturer.",
            }}
            render={({ field, fieldState }) => (
              <div className="align-items-center" style={{ margin: "20px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames({ "p-invalid": fieldState.error })}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  
                <label htmlFor={field.name} style={{color:"#070606"}}>Manufacturer</label>
                </span>

                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        <div className="align-form-inputs">
          <Controller
            name="chemicalDosage"
            control={control}
            rules={{
              required: "Enter a valid chemicalDosage.",
              // validate: (value) =>
              //   (value >= 0 && value <= 14) || "Enter a valid chemicalDosage.",
            }}
            render={({ field, fieldState }) => (
              <div className="align-items-center" style={{ margin: "20px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    maxFractionDigits={5} 
                    // min={0}
                    // max={14}
                    // suffix=" mg/L"
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />{" mg/L"}
                  
                <label htmlFor={field.name} style={{color:"#070606"}}>Chemical Dosage</label>
                </span>

                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        <div className="align-form-inputs">
          <Controller
            name="mixingSpeed"
            control={control}
            rules={{
              required: "Enter a valid mixingSpeed.",
              // validate: (value) =>
              //   (value >= 0 && value <= 14) || "Enter a valid mixingSpeed.",
            }}
            render={({ field, fieldState }) => (
              <div className="align-items-center" style={{ margin: "20px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    maxFractionDigits={5} 
                    // min={0}
                    // max={14}
                    // suffix=" rpm"
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />{" rpm"}
                  
                <label htmlFor={field.name} style={{color:"#070606"}}>Mixing Speed</label>
                </span>

                <div>{getFormErrorMessage(field.name)}</div>
                {/* <div className="col-3 ">
                  <label htmlFor={field.name} style={{color:"#070606"}}>mixingSpeed</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    suffix=" rpm"
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div> */}
              </div>
            )}
          />
        </div>
        <div className="align-form-inputs">
          <Controller
            name="reactionTime"
            control={control}
            rules={{
              required: "Enter a valid reactionTime.",
              // validate: (value) =>
              //   (value >= 0 && value <= 14) || "Enter a valid reactionTime.",
            }}
            render={({ field, fieldState }) => (
              <div className="align-items-center" style={{ margin: "20px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    maxFractionDigits={5} 
                    // min={0}
                    // max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                  <label htmlFor={field.name} style={{color:"#070606"}}>reactionTime</label>
                </span>

                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
          <Controller
            name="reactionUnit"
            control={control}
            rules={{ required: "reaction unit is required." }}
            render={({ field, fieldState }) => (
              <div className="align-items-center" style={{ margin: "20px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  {/* <div className="col-3"> */}
                  <Dropdown
                    value={field.value}
                    optionLabel="name"
                    placeholder="Min/Sec"
                    name={"reactionUnit"}
                    options={[
                      { name: "Min", code: "m" },
                      { name: "Sec", code: "s" },
                    ]}
                    control={control}
                    onChange={(e) => field.onChange(e.value)}
                    style={{ width: "73%" }}
                    className={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />

                  
<label htmlFor={field.name} style={{color:"#070606"}}>reactionUnit</label>
                </span>
                {/* </div> */}

                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
      </>
    );
  };

  const genericParameterComponent = (name, usedName, fieldName) => {
    const parameters = {
      initial: name + "Initial",
      initialUsedName: usedName + " Initial",
      final: name + "Final",
      finalUsedName: usedName + " Final",
      removal: name + "Removal",
      removalUsedName: usedName + " Removal",
    };
    // console.log(parameters);
    return (
      <div className="grid align-items-center" style={{ margin: "10px" }}>
        {/* <div className=""> */}
        <div className="col-3">{fieldName}</div>
        <div className="col-3">
          {/* <label htmlFor="integer" >
                        Integer
                    </label>
                    <InputText id="integer" keyfilter="int" className="w-full" /> */}
          <Controller
            name={parameters.initial}
            control={control}
            rules={{
              required: `Enter a valid ${parameters.initialUsedName}.`,
              // validate: (value) =>
              //   (value >= 0 && value <= 14) ||
              //   `Enter a valid ${parameters.initialUsedName}.,`,
            }}
            render={({ field, fieldState }) => (
              <div>
                <span className="p-float-label" style={{ margin: "5px" }}>

                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    allowEmpty={true}
                    onBlur={field.onBlur}
                    maxFractionDigits={5} 
                    // min={0}
                    // max={14}
                    // style={{ width: "50%" }}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />

                <label htmlFor={field.name} style={{color:"#070606"}}>
                    {/* {parameters.initialUsedName}
                     */}
                     Initial
                  </label>
                </span>
                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>

        <div className="col-3">
          {/* <label htmlFor="number" className="font-bold block mb-2">
                        Number
                    </label>
                    <InputText id="number" keyfilter="num" className="w-full" /> */}
          <Controller
            name={parameters.final}
            control={control}
            rules={{
              required: `Enter a valid ${parameters.finalUsedName}.`,
              // validate: (value) =>
              //   (value >= 0 && value <= 14) ||
              //   `Enter a valid ${parameters.finalUsedName}.,`,
            }}
            render={({ field, fieldState }) => (
              <div>
                <span className="p-float-label" style={{ margin: "5px" }}>

                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    maxFractionDigits={5} 
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />

                <label htmlFor={field.name} style={{color:"#070606"}}>
                    {/* {parameters.finalUsedName} */}
                    Final
                    </label>
                </span>
                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        <div className="col-3">
          {/* <label htmlFor="money" className="font-bold block mb-2">
                        Money
                    </label> */}
          <Controller
            name={parameters.removal}
            control={control}
            
            render={({ field, fieldState }) => (
              <div>
                <span className="p-float-label" style={{ margin: "5px" }}>

                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    maxFractionDigits={5} 
                    // style={{ width: "50%" }}
                    disabled
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />

                <label htmlFor={field.name} style={{color:"#070606"}}>
                    {/* {parameters.removalUsedName} */}
                    Removal %
                  </label>
                </span>
                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        {/* </div> */}
      </div>
    );
  };

  const basicInformation = () => {
    return (
      <>
        <div style={{ padding: "5px" }}>Basic Information</div>
        <div className="grid align-items-center justify-content-center">
          <div className="align-form-inputs">
            <Controller
              name="source"
              control={control}
              rules={{ required: "source is required." }}
              render={({ field, fieldState }) => (
                <div className="align-items-center" style={{ margin: "20px" }}>
                  <span className="p-float-label" style={{ margin: "5px" }}>
                  
                    <Dropdown
                      value={field.value}
                      optionLabel="name"
                      placeholder="Select"
                      name={field.name}
                      options={sources}
                      control={control}
                      onChange={(e) => field.onChange(e.value)}
                      style={{ width: "100%" }}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                    <label htmlFor={field.name} style={{color:"#070606"}}>Source</label>
                  </span>
                  <div>{getFormErrorMessage(field.name)}</div>
                </div>
              )}
            />
          </div>
          <div className="align-form-inputs">
            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required." }}
              render={({ field, fieldState }) => (
                <div className="align-items-center" style={{ margin: "20px" }}>
                  <span className="p-float-label" style={{ margin: "5px" }}>
                  
                    <Calendar
                      inputId={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      dateFormat="mm/dd/yy"
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                    <label htmlFor={field.name} style={{color:"#070606"}}>Date</label>
                  </span>
                  <div>{getFormErrorMessage(field.name)}</div>
                </div>
              )}
            />
          </div>
          <div className="align-form-inputs">
            <Controller
              name="model"
              control={control}
              rules={{
                required: "Enter a valid model.",
              }}
              render={({ field, fieldState }) => (
                <div className="align-items-center" style={{ margin: "20px" }}>
                  <span className="p-float-label" style={{ margin: "5px" }}>
                    <InputText
                      id={field.name}
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    
                  <label htmlFor={field.name} style={{color:"#070606"}}>Model</label>
                  </span>
                  <div>{getFormErrorMessage(field.name)}</div>
                </div>
              )}
            />
          </div>
          <div className="align-form-inputs">
            <Controller
              name="device"
              control={control}
              rules={{
                required: "Enter a valid device.",
              }}
              render={({ field, fieldState }) => (
                <div className="align-items-center" style={{ margin: "20px" }}>
                  <span className="p-float-label" style={{ margin: "5px" }}>
                  
                    <InputText
                      id={field.name}
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  <label htmlFor={field.name} style={{color:"#070606"}}>Device</label>  
                  </span>
                  <div>{getFormErrorMessage(field.name)}</div>
                </div>
              )}
            />
          </div>
        </div>
      </>
    );
  };

  const experimentalResults = () => {
    return (
      <>
        <div className="justify-content-center">Experimental Results</div>
        <div className="align-form-inputs">
          {genericParameterComponent(
            "turbidity",
            "Turbidity",
            "Turbidity(NTU)"
          )}
          {genericParameterComponent(
            "totalMicrocystis",
            "Total Microcystis",
            "Total Microcystis (PC-IGS) (Log gene copies/L)"
          )}
          {genericParameterComponent(
            "mcyeMicrocystis",
            "mcye Microcystis",
            "mcye Microcystis(Log gene copies/L)"
          )}
          {genericParameterComponent(
            "mycePlanktothrix",
            "myce Planktothrix",
            "mcye Planktothrix(Log gene copies/L)"
          )}
          {genericParameterComponent(
            "totalMicrocystins",
            "Total Microcystins",
            "Total Microcystins(ppb)"
          )}
        </div>
      </>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <div
        className="card justify-content-center dialog-margin"
        // style={{
        //   backgroundColor: "#a0dcbc",
        //   borderRadius: "15px",
        //   margin: "10px",
        // }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          Coagulation
          <div style={{backgroundColor:'rgb(182,204,182)',margin:'1.75em',borderRadius:'.5em'}}>{basicInformation()}</div>
          <div className="card grid" style={{backgroundColor:'rgb(182,204,182)',margin:'1.75em',borderRadius:'.5em'}}>
            <div className="col-3" style={{backgroundColor:'rgb(140,163,140)',margin:'1.75em',borderRadius:'.5em'}}>{experimentalConditions()}</div>
            <div className="col-8" style={{backgroundColor:'rgb(140,163,140)',margin:'1.75em',borderRadius:'.5em'}}>{experimentalResults()}</div>
          </div>
          <div>
          <Button
            label="Submit"
            type="submit"
            icon="pi pi-check"
            className="button"
            style={{ margin: "10px" }}
          />
          </div>
          
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default Coagulation;

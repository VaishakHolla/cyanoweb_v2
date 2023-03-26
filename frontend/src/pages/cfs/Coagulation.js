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
import "./Coagulation.css"

const Coagulation = () => {
  // const [visible, setVisible] = useState(false);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const toast = useRef(null);

  const defaultValues = {
    source: "", //dropdown
    date: "", //calendar
    model: "", //inputText
    device: "", //inputText

    //Experimental Conditions
    waterTemperature: "", //inputNumber
    waterpH: "", //inputNumber
    chemicalType: "", //dropdown
    otherChemicalType: "", //inputText
    manufacturer: "", //inputText
    chemicalDosage: "", //inputNumber
    chemicalSpeed: "", //inputNumber
    reactionTime: "", //
    reactionUnit: "", //dropdown [Min,Sec]

    //Experimental results
    turbidityInitial: "",
    turbidityFinal: "",
    turbidityRemoval: "",
    totalMicrocystisInitial: "",
    totalMicrocystisFinal: "",
    totalMicrocystisRemoval: "",
    mcyeMicrocystisInitial: "",
    mcyeMicrocystisFinal: "",
    mcyeMicrocystisRemoval: "",
    mycePlanktothrixInitial: "",
    mycePlanktothrixFinal: "",
    mycePlanktothrixRemoval: "",
    totalMicrocystinsInitial: "",
    totalMicrocystinsFinal: "",
    totalMicrocystinsRemoval: "",

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
    console.log('useeffect',watchTurbidity)
    console.log(watchTurbidity[0]!='' & watchTurbidity[1]!='' &
      getValues("turbidityRemoval") != watchTurbidity[0] - watchTurbidity[1])
    const interval = setTimeout(() => {
      if (
        watchTurbidity[0]!='' & watchTurbidity[1]!='' &
      getValues("turbidityRemoval") != watchTurbidity[0] - watchTurbidity[1]
      ) {
        console.log('inside if')
        setValue("turbidityRemoval", watchTurbidity[0] - watchTurbidity[1]);
      }
      if (
        watchTotalMicrocystis[0]!='' & watchTotalMicrocystis[1]!='' &
        getValues("totalMicrocystisRemoval") !=
          watchTotalMicrocystis[0] - watchTotalMicrocystis[1]
      ) {
        setValue(
          "totalMicrocystisRemoval",
          watchTotalMicrocystis[0] - watchTotalMicrocystis[1]
        );
      }
      if (
        watchmcyeMicrocystis[0]!='' & watchmcyeMicrocystis[1]!='' &
        getValues("mcyeMicrocystisRemoval") !=
          watchmcyeMicrocystis[0] - watchmcyeMicrocystis[1]
      ) {
        setValue(
          "mcyeMicrocystisRemoval",
          watchmcyeMicrocystis[0] - watchmcyeMicrocystis[1]
        );
      }
      if (
        watchmycePlanktothrix[0]!='' & watchmycePlanktothrix[1]!='' &
        getValues("mycePlanktothrixRemoval") !=
          watchmycePlanktothrix[0] - watchmycePlanktothrix[1]
      ) {
        setValue(
          "mycePlanktothrixRemoval",
          watchmycePlanktothrix[0] - watchmycePlanktothrix[1]
        );
      }
      if (
        watchtotalMicrocystins[0]!='' & watchtotalMicrocystins[1]!='' &
        getValues("totalMicrocystinsRemoval") !=
          watchtotalMicrocystins[0] - watchtotalMicrocystins[1]
      ) {
        setValue(
          "totalMicrocystinsRemoval",
          watchtotalMicrocystins[0] - watchtotalMicrocystins[1]
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

  const onSubmit = (data) => {
    // data.value && show();
    // data.calendar && show();
    // data.dropdown && show();

    console.log(data);
    data.date && show();
    reset();
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
        <div className="align-form-inputs">
          <Controller
            name="waterTemperature"
            control={control}
            rules={{
              required: "Enter a valid waterTemperature.",
              validate: (value) =>
                (value >= 0 && value <= 44) ||
                "Enter a valid waterTemperature.",
            }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>waterTemperature</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={44}
                    suffix="℃"
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        {/* <div className="align-form-inputs">
            <Controller
              name="pH"
              control={control}
              rules={{
                required: "Enter a valid pH.",
                validate: (value) =>
                  (value >= 0 && value <= 14) || "Enter a valid pH.",
              }}
              render={({ field, fieldState }) => (
                <div className="grid align-items-center" style={{margin:"10px"}}>
                  <div className="col-3 ">
                    <label htmlFor={field.name}>pH</label>
                  </div>
                  <div className="col-3 ">
                    <InputNumber onValueChange={(e) => field.onChange(e)}
                      id={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      min={0}
                      max={14}
                      inputClassName={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                  </div>
                  <div className="col-5">{getFormErrorMessage(field.name)}</div>
                </div>
              )}
            />
          </div> */}
        <div className="align-form-inputs">
          <Controller
            name="waterpH"
            control={control}
            rules={{
              required: "Enter a valid waterpH.",
              validate: (value) =>
                (value >= 0 && value <= 14) || "Enter a valid waterpH.",
            }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>waterpH</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
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
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>chemicalType</label>
                </div>
                <div className="col-3">
                  <Dropdown
                    value={field.value}
                    optionLabel="name"
                    placeholder="Select"
                    name={field.name}
                    options={cities}
                    control={control}
                    onChange={(e) => field.onChange(e.value)}
                    // style={{ width: "100%" }}
                    className={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>

                <div className="col-5">{getFormErrorMessage(field.name)}</div>
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
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>otherChemicalType</label>
                </div>
                <div className="col-3 ">
                  {/* <InputText
                      id={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      inputClassName={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    /> */}
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames({ "p-invalid": fieldState.error })}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
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
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>manufacturer</label>
                </div>
                <div className="col-3 ">
                  {/* <InputText
                      id={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      inputClassName={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    /> */}
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames({ "p-invalid": fieldState.error })}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
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
              validate: (value) =>
                (value >= 0 && value <= 14) || "Enter a valid chemicalDosage.",
            }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>chemicalDosage</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    suffix="mg/L"
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        <div className="align-form-inputs">
          <Controller
            name="chemicalSpeed"
            control={control}
            rules={{
              required: "Enter a valid chemicalSpeed.",
              validate: (value) =>
                (value >= 0 && value <= 14) || "Enter a valid chemicalSpeed.",
            }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>chemicalSpeed</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    suffix="rpm"
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
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
              validate: (value) =>
                (value >= 0 && value <= 14) || "Enter a valid reactionTime.",
            }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>reactionTime</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                {/* <div className="col-1">
                  <Dropdown
                      value={field.reactionUnit}
                      optionLabel="name"
                      placeholder="Select"
                      name={'reactionUnit'}
                      options={[{name:'Minutes',code:'m'},{name:'Seconds',code:'s'}]}
                      control={control}
                      onChange={(e) => field.onChange(e.value)}
                      style={{ width: "100%" }}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                  </div> */}
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
          <Controller
            name="reactionUnit"
            control={control}
            rules={{ required: "reaction unit is required." }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3">
                  <Dropdown
                    value={field.reactionUnit}
                    optionLabel="name"
                    placeholder="Select"
                    name={"reactionUnit"}
                    options={[
                      { name: "Minutes", code: "m" },
                      { name: "Seconds", code: "s" },
                    ]}
                    control={control}
                    onChange={(e) => field.onChange(e.value)}
                    style={{ width: "100%" }}
                    className={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>

                <div className="col-5">{getFormErrorMessage(field.name)}</div>
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
    console.log(parameters)
    return (
      <div className="grid align-items-center" style={{margin:"10px"}}style={{margin:'10px'}}>
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
                validate: (value) =>
                  (value >= 0 && value <= 14) ||
                  `Enter a valid ${parameters.initialUsedName}.,`,
              }}
              render={({ field, fieldState }) => (
                <div>
                  <span className="p-float-label" style={{ margin: "5px" }}>
                    <InputNumber
                      onValueChange={(e) => field.onChange(e)}
                      id={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      min={0}
                      max={14}
                      style={{width:'75%'}}
                      inputClassName={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                    <label htmlFor={field.name} className="block mb-1">
                      {parameters.initialUsedName}
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
                validate: (value) =>
                  (value >= 0 && value <= 14) ||
                  `Enter a valid ${parameters.finalUsedName}.,`,
              }}
              render={({ field, fieldState }) => (
                <div>
                  <span className="p-float-label" style={{ margin: "5px" }}>
                    <InputNumber
                      onValueChange={(e) => field.onChange(e)}
                      id={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      min={0}
                      style={{width:'75%'}}
                      max={14}
                      inputClassName={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                    <label htmlFor={field.name} className="block mb-1">
                      {parameters.finalUsedName}
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
              rules={{
                required: `Enter a valid ${parameters.removalUsedName}.`,
                validate: (value) =>
                  (value >= 0 && value <= 14) ||
                  `Enter a valid ${parameters.removalUsedName}.,`,
              }}
              render={({ field, fieldState }) => (
                <div>
                  <span className="p-float-label" style={{ margin: "5px" }}>
                    <InputNumber
                      onValueChange={(e) => field.onChange(e)}
                      id={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      min={0}
                      max={14}
                      style={{width:'75%'}}
                      disabled
                      inputClassName={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                    <label htmlFor={field.name} className="block mb-1">
                      {parameters.removalUsedName}
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

  const experimentalResults = () => {
    return (
      <>
        <div className="align-form-inputs" >
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
          {/* <Controller
            name="turbidityInitial"
            control={control}
            rules={{
              required: "Enter a valid Turbidity Initial.",
              validate: (value) =>
                (value >= 0 && value <= 14) ||
                "Enter a valid Turbidity Initial.",
            }}
            render={({ field, fieldState }) => (
              <div className="align-items-center">
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                  <label htmlFor={field.name} className="block mb-1">
                    Turbidity Initial
                  </label>
                </span>
                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          /> */}
        </div>

        {/* <div className="align-form-inputs">
          <Controller
            name="turbidityFinal"
            control={control}
            rules={{
              required: "Enter a valid Turbidity Final.",
              validate: (value) =>
                (value >= 0 && value <= 14) || "Enter a valid Turbidity Final.",
            }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>Turbidity Final</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div> */}

        {/* <div className="align-form-inputs">
          <Controller
            name="turbidityRemoval"
            control={control}
            // rules={{
            //   required: "Enter a valid Turbidity Removal.",
            //   validate: (value) =>
            //     (value >= 0 && value <= 14) ||
            //     "Enter a valid Turbidity Removal.",
            // }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>Turbidity Removal</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    disabled
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
 */}
        {/* <div className="align-form-inputs">
          <Controller
            name="totalMicrocystisInitial"
            control={control}
            rules={{
              required: "Enter a valid Total Microcystis Initial.",
              validate: (value) =>
                (value >= 0 && value <= 14) ||
                "Enter a valid Total Microcystis Initial.",
            }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>Total Microcystis Initial</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div> */}

        {/* <div className="align-form-inputs">
          <Controller
            name="totalMicrocystisFinal"
            control={control}
            rules={{
              required: "Enter a valid Total Microcystis Final.",
              validate: (value) =>
                (value >= 0 && value <= 14) ||
                "Enter a valid Total Microcystis Final.",
            }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>Total Microcystis Final</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
 */}
        {/* <div className="align-form-inputs">
          <Controller
            name="totalMicrocystisRemoval"
            control={control}
            // rules={{
            //   required: "Enter a valid Total Microcystis Removal.",
            //   validate: (value) =>
            //     (value >= 0 && value <= 14) ||
            //     "Enter a valid Total Microcystis Removal.",
            // }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>Total Microcystis Removal</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    disabled
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>

        <div className="align-form-inputs">
          <Controller
            name="mcyeMicrocystisInitial"
            control={control}
            rules={{
              required: "Enter a valid mcye Microcystis Initial.",
              validate: (value) =>
                (value >= 0 && value <= 14) ||
                "Enter a valid mcye Microcystis Initial.",
            }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>mcye Microcystis Initial</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>

        <div className="align-form-inputs">
          <Controller
            name="mcyeMicrocystisFinal"
            control={control}
            rules={{
              required: "Enter a valid mcye Microcystis Final.",
              validate: (value) =>
                (value >= 0 && value <= 14) ||
                "Enter a valid mcye Microcystis Final.",
            }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>mcye Microcystis Final</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
 */}
        {/* <div className="align-form-inputs">
          <Controller
            name="mcyeMicrocystisRemoval"
            control={control}
            // rules={{
            //   required: "Enter a valid mcye Microcystis Removal.",
            //   validate: (value) =>
            //     (value >= 0 && value <= 14) ||
            //     "Enter a valid mcye Microcystis Removal.",
            // }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>mcye Microcystis Removal</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    disabled
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div> */}

        {/* <div className="align-form-inputs">
          <Controller
            name="mycePlanktothrixInitial"
            control={control}
            rules={{
              required: "Enter a valid myce Planktothrix Initial.",
              validate: (value) =>
                (value >= 0 && value <= 14) ||
                "Enter a valid myce Planktothrix Initial.",
            }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>myce Planktothrix Initial</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>

        <div className="align-form-inputs">
          <Controller
            name="mycePlanktothrixFinal"
            control={control}
            rules={{
              required: "Enter a valid myce Planktothrix Final.",
              validate: (value) =>
                (value >= 0 && value <= 14) ||
                "Enter a valid myce Planktothrix Final.",
            }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>myce Planktothrix Final</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
 */}
        {/* <div className="align-form-inputs">
          <Controller
            name="mycePlanktothrixRemoval"
            control={control}
            // rules={{
            //   required: "Enter a valid myce Planktothrix Removal.",
            //   validate: (value) =>
            //     (value >= 0 && value <= 14) ||
            //     "Enter a valid myce Planktothrix Removal.",
            // }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>myce Planktothrix Removal</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    disabled
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>

        <div className="align-form-inputs">
          <Controller
            name="totalMicrocystinsInitial"
            control={control}
            rules={{
              required: "Enter a valid Total Microcystins Final.",
              validate: (value) =>
                (value >= 0 && value <= 14) ||
                "Enter a valid Total Microcystins Final.",
            }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>Total Microcystins Initial</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div> */}

        {/* <div className="align-form-inputs">
          <Controller
            name="totalMicrocystinsFinal"
            control={control}
            rules={{
              required: "Enter a valid Total Microcystins Final.",
              validate: (value) =>
                (value >= 0 && value <= 14) ||
                "Enter a valid Total Microcystins Final.",
            }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>Total Microcystins Final</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>

        <div className="align-form-inputs">
          <Controller
            name="totalMicrocystinsRemoval"
            control={control}
            // rules={{
            //   required: "Enter a valid Total Microcystins Removal.",
            //   validate: (value) =>
            //     (value >= 0 && value <= 14) ||
            //     "Enter a valid Total Microcystins Removal.",
            // }}
            render={({ field, fieldState }) => (
              <div className="grid align-items-center" style={{margin:"10px"}}>
                <div className="col-3 ">
                  <label htmlFor={field.name}>Total Microcystins Removal</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    disabled
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div> */}
      </>
    );
  };

  return (
    <div>
      <div className="card justify-content-center dialog-margin">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-column gap-2"
        >
          <div className="align-form-inputs">
            <Controller
              name="source"
              control={control}
              rules={{ required: "source is required." }}
              render={({ field, fieldState }) => (
                <div className="grid align-items-center" style={{margin:"10px"}}>
                  <div className="col-3 ">
                    <label htmlFor={field.name}>source</label>
                  </div>
                  <div className="col-3">
                    <Dropdown
                      value={field.value}
                      optionLabel="name"
                      placeholder="Select"
                      name={field.name}
                      options={cities}
                      control={control}
                      onChange={(e) => field.onChange(e.value)}
                      // style={{ width: auto }}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                  </div>

                  <div className="col-5">{getFormErrorMessage(field.name)}</div>
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
                <div className="grid align-items-center" style={{margin:"10px"}}>
                  <div className="col-3 ">
                    <label htmlFor={field.name}>Date</label>
                  </div>
                  <div className="col-3">
                    <Calendar
                      inputId={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      dateFormat="mm/dd/yy"
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                  </div>
                  <div className="col-5">{getFormErrorMessage(field.name)}</div>
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
                <div className="grid align-items-center" style={{margin:"10px"}}>
                  <div className="col-3 ">
                    <label htmlFor={field.name}>model</label>
                  </div>
                  <div className="col-3 ">
                    {/* <InputText
                      id={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      inputClassName={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    /> */}
                    <InputText
                      id={field.name}
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </div>
                  <div className="col-5">{getFormErrorMessage(field.name)}</div>
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
                <div className="grid align-items-center" style={{margin:"10px"}}>
                  <div className="col-3 ">
                    <label htmlFor={field.name}>device</label>
                  </div>
                  <div className="col-3 ">
                    {/* <InputText
                      id={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      inputClassName={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    /> */}
                    <InputText
                      id={field.name}
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </div>
                  <div className="col-5">{getFormErrorMessage(field.name)}</div>
                </div>
              )}
            />
          </div>
          <div>
            Experimental Conditions waterTemperature: "", //inputNumber waterpH:
            "", //inputNumber chemicalType: "", //dropdown otherChemicalType:
            "", //inputText manufacturer: "", //inputText chemicalDosage: "",
            //inputNumber chemicalSpeed: "", //inputNumber reactionTime: "", //
            reactionUnit: "", //dropdown [Min,Sec]
          </div>
          {experimentalConditions()}

          <div>Experimental results</div>
          {experimentalResults()}
          <Button label="Submit" type="submit" icon="pi pi-check" />
        </form>
      </div>
      <div>
        <div>Experimental Conditions</div>
      </div>
    </div>
  );
};

export default Coagulation;

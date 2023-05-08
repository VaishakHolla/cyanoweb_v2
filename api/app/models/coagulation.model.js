module.exports = (mongoose) => {
  var CoagulationSchema = mongoose.Schema(
    {
      basic_information: {
        model: { type: String, require: true, max: 300 },
        device: { type: String },
        date: { type: Date,require: true },
        source: { type: String },
        experiment_id: { type: String },
      },
      experimental_conditions: {
        water_temperature: { type: Number,required: true,
            max: 30,
            min: 0, }, //inputNumber
        water_pH: { type: Number,
            required: true,
            max: 14,
            min: 1 }, //inputNumber
        chemical_type: { type: String ,required: true}, //dropdown
        other_chemical_type: { type: String }, //inputText
        manufacturer: { type: String,required: true }, //inputText
        chemical_dosage: { type: Number }, //inputNumber
        mixing_speed: { type: Number,required: true, }, //inputNumber
        reaction_time: { type: Number }, //
        reaction_unit: { type: String }, //dropdown [Min,Sec]
      },
      experimental_results: {
        turbidity_initial: { type: Number,required: true },
        turbidity_final: { type: Number,required: true },
        turbidity_removal: { type: Number,required: true },
        totalMicrocystis_initial: { type: Number,required: true },
        totalMicrocystis_final: { type: Number,required: true },
        totalMicrocystis_removal: { type: Number,required: true },
        mcyeMicrocystis_initial: { type: Number,required: true },
        mcyeMicrocystis_final: { type: Number,required: true },
        mcyeMicrocystis_removal: { type: Number,required: true },
        mycePlanktothrix_initial: { type: Number,required: true },
        mycePlanktothrix_final: { type: Number,required: true },
        mycePlanktothrix_removal: { type: Number,required: true },
        totalMicrocystins_initial: { type: Number,required: true },
        totalMicrocystins_final: { type: Number,required: true },
        totalMicrocystins_removal: { type: Number,required: true },
      },
    },
    { timestamps: true }
  );
  CoagulationSchema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

  const Coagulation = mongoose.model("coagulation", CoagulationSchema);

  return Coagulation;
};

module.exports = (mongoose) => {
    var CombinedCFSSchema = mongoose.Schema(
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
          coagulant_type:{ type: String ,required: true},
          coagulant_manufacturer: { type: String,required: true }, //inputText
          coagulant_chemical_dosage: { type: Number }, //inputNumber
          coagulant_mixing_speed: { type: Number,required: true, }, //inputNumber
          coagulant_reaction_time: { type: Number }, //
          coagulant_reaction_unit: { type: String }, //dropdown [Min,Sec]

          flocculant_type:{ type: String ,required: true},
          flocculant_manufacturer: { type: String,required: true }, //inputText
          flocculant_chemical_dosage: { type: Number }, //inputNumber
          flocculant_mixing_speed: { type: Number,required: true, }, //inputNumber
          flocculant_reaction_time: { type: Number }, //
          flocculant_reaction_unit: { type: String }, //dropdown [Min,Sec]
          
          sedimentation_reaction_time: { type: Number }, //
          sedimentation_reaction_unit: { type: String }, //dropdown [Min,Sec]

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
    CombinedCFSSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
  
    const CombinedCFS = mongoose.model("combinedcfs", CombinedCFSSchema);
  
    return CombinedCFS;
  };
  
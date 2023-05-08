module.exports = (mongoose) => {
    const RawwaterdataSchema = mongoose.Schema(
      {
        source: {
            type: String,
            require: true,
            max:100,
          },
          date: {
            type: Date,
            require: true,
      
          },  
          temperature: {
            type: Number,
            require: true,
            min: 0,
            max: 30,
      
          },
          ph: {
            type: Number,
            required: true,
            max: 14,
      
          },
          turbidity: {
            type: Number,
            required: true,
            max: 50,
          },
      
          // zetapotential: {
          //     type: Number,
          //     required: true,
          //     max: 3000,
          //   },
          
          dissolvedoxygen: {
              type: Number,
              required: true,
              max: 3000,
            },
          
          // totaldissolvedsolids: {
          //     type: Number,
          //     required: true,
          //     max: 3000,
          //   },
      
          // electricalconductivity: {
          //     type: Number,
          //     required: true,
          //     max: 3000,
          //   },      
      
            totalmicrocytis:{
              type: Number,
              required: true,
              max: 3000,
      
            },
      
            mcyemicrocytis: {
              type: Number,
              required: true,
              max: 3000,
            },
      
            mcyeplanktothrix: {
              type: Number,
              required: true,
              max: 3000,
            },
            totalmicrocystins: {
              type: Number,
              required: true,
              max: 3000,
            },
      },
      { timestamps: true }
    );
      RawwaterdataSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
  
    const Rawwaterdata = mongoose.model("rawwaterdata", RawwaterdataSchema);
  
    return Rawwaterdata;
  };
  
const { Schema, connection } = require("mongoose");

const Report = new Schema(
  {
    patient_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Please add a User ID"],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a Report Name"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please add a Description"],
    },
    type: {
      type: String,
      trim: true,
      enum: ["pdf", "image"],
      match: [
        /^(pdf|image)$/,
        (props) => `${props.value} is not a valid report type`,
      ],
      required: [true, "Please add a Report Type"],
    },
    disease: {
      type: String,
      trim: true,
      match: [
        /^[a-zA-Z0-9]+$/,
        (props) => `${props.value} is not a valid disease`,
      ],
      required: [true, "Please add a Disease"],
    },
    criticality: {
      type: String,
      trim: true,
      enum: ["low", "medium", "high"],
      match: [
        /^(low|medium|high)$/,
        (props) => `${props.value} is not a valid criticality`,
      ],
      required: [true, "Please add a Criticality"],
    },
    date: {
      type: Date,
      required: [true, "Please add a Date"],
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = connection.useDb("TECHGIUM").model("REPORT", Report);

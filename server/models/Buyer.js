const { Schema, connection } = require("mongoose");

const Buyer = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Please add a User ID"],
    },
    organization_name: {
      type: String,
      trim: true,
      required: [true, "Please add a Report Name"],
    },
    pan_number: {
      type: String,
      trim: true,
      required: [true, "Please add a PAN Number"],
    },
    gst_number: {
      type: String,
      trim: true,
      required: [true, "Please add a GST Number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = connection.useDb("TECHGIUM").model("BUYER", Buyer);

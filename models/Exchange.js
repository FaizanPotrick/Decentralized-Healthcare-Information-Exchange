const { Schema, connection } = require("mongoose");

const Exchange = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Please add a User ID"],
    },
    report_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Please add a Report Name"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = connection.useDb("TECHGIUM").model("EXCHANGE", Exchange);

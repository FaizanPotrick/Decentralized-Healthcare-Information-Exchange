const { Schema, connection } = require("mongoose");

const User = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a Name"],
    },
    email_address: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
        (props) => `${props.value} is not a valid email`,
      ],
      required: [true, "Please add an Email Address"],
      unique: true,
    },
    age: {
      type: Number,
      required: [true, "Please add an Age"],
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Please add an Address"],
    },
    password: {
      type: String,
      required: [true, "Please add a Password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = connection.useDb("TECHGIUM").model("USER", User);

const { ethers } = require("ethers");
const User = require("../models/User");
const { wallet, my_contract } = require("../wallet");

const options = {
  gasLimit: 3000000,
  gasPrice: ethers.BigNumber.from("200000000000"),
};
const connect = my_contract.connect(wallet);

const PatientRegister = async (req, res) => {
  const { name, email_address, type_of_user, wallet_address, password } =
    req.body;
  try {
    const email_response = await User.findOne({ email_address }).lean();
    if (email_response !== null) {
      return res
        .status(400)
        .json({ type: "error", message: "Email Address already exists" });
    }
    const response = await User.create({
      name,
      email_address,
      type_of_user,
      wallet_address,
      password,
    });
    res.cookie("user_id", response._id).cookie("user_type", type_of_user).json({
      type: "success",
      message: "Registered Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ type: "error", message: err });
  }
};

const DoctorRegister = async (req, res) => {
  const {
    name,
    email_address,
    type_of_user,
    registration_number,
    wallet_address,
    password,
  } = req.body;
  try {
    const email_response = await User.findOne({ email_address }).lean();
    if (email_response !== null) {
      return res
        .status(400)
        .json({ type: "error", message: "Email Address already exists" });
    }
    const response = await User.create({
      name,
      email_address,
      type_of_user,
      registration_number,
      wallet_address,
      password,
    });
    res.cookie("user_id", response._id).cookie("user_type", type_of_user).json({
      type: "success",
      message: "Registered Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ type: "error", message: err });
  }
};

const BuyerRegister = async (req, res) => {
  const {
    name,
    email_address,
    type_of_user,
    wallet_address,
    gst_number,
    password,
  } = req.body;
  try {
    const email_response = await User.findOne({ email_address }).lean();
    if (email_response !== null) {
      return res
        .status(400)
        .json({ type: "error", message: "Email Address already exists" });
    }
    const response = await User.create({
      name,
      email_address,
      type_of_user,
      wallet_address,
      gst_number,
      password,
    });
    res.cookie("user_id", response._id).cookie("user_type", type_of_user).json({
      type: "success",
      message: "Registered Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ type: "error", message: err });
  }
};

const Login = async (req, res) => {
  const { email_address, password } = req.body;
  try {
    const response = await User.findOne({
      email_address,
      password,
    }).lean();
    if (response === null) {
      return res
        .status(400)
        .json({ type: "error", message: "Invalid Credentials" });
    }
    res.status(200).json({
      type: "success",
      message: "Logged In Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ type: "error", message: err });
  }
};

const Blockchain_User_Register = async (id, address, name, role) => {
  try {
    const tx = await connect.registerUser(id, address, name, role, options);
    console.log(await tx, "Registered Successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  PatientRegister,
  DoctorRegister,
  BuyerRegister,
  Login,
};

const { ethers } = require("ethers");
const User = require("../models/User");
const { wallet, my_contract } = require("../wallet");

const options = {
  gasLimit: 3000000,
  gasPrice: ethers.BigNumber.from("200000000000"),
};
const connect = my_contract.connect(wallet);

const PatientRegister = async (req, res) => {
  const { name, email_address, type_of_user, password } = req.body;
  const user_response = new User({
    name,
    email_address,
    type_of_user,
    password,
  })
  try {
    const email_response = await User.findOne({ email_address }).lean();
    if (email_response !== null) {
      return res.status(400).send("Email Address already exists");
    }
    await user_response.validate();
    await Blockchain_User_Register(user_response._id, name, type_of_user);
    await user_response.save();
    res.cookie("user_id", user_response._id).cookie("user_type", type_of_user).send("Registered Successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DoctorRegister = async (req, res) => {
  const { name, email_address, type_of_user, registration_number, password } =
    req.body;
  const user_response = new User({
    name,
    email_address,
    type_of_user,
    registration_number,
    password,
  })
  try {
    const email_response = await User.findOne({ email_address }).lean();
    if (email_response !== null) {
      return res.status(400).send("Email Address already exists");
    }
    await user_response.validate();
    await Blockchain_User_Register(user_response._id, name, type_of_user);
    await user_response.save();
    res.cookie("user_id", user_response._id).cookie("user_type", type_of_user).send("Registered Successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const BuyerRegister = async (req, res) => {
  const { name, email_address, type_of_user, gst_number, password } = req.body;
  const user_response = new User({
    name,
    email_address,
    type_of_user,
    gst_number,
    password,
  })
  try {
    const email_response = await User.findOne({ email_address }).lean();
    if (email_response !== null) {
      return res.status(400).send("Email Address already exists");
    }
    await user_response.validate();
    await Blockchain_User_Register(user_response._id, name, type_of_user);
    await user_response.save();
    res.cookie("user_id", user_response._id).cookie("user_type", type_of_user).send("Registered Successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
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
      return res.status(400).send("Invalid Credentials");
    }
    res.cookie("user_id", response._id).cookie("user_type", response.type_of_user).send("Login Successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const GetPatient = async (req, res) => {
  try {
    const response = await User.find({
      type_of_user: "patient"
    }).lean();
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const Blockchain_User_Register = async (id, name, role) => {
  const tx = await connect.registerUser(id, name, role, options);
  console.log(await tx, "Registered Successfully");
};

module.exports = {
  PatientRegister,
  DoctorRegister,
  BuyerRegister,
  GetPatient,
  Login,
};

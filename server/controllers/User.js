const { ethers } = require("ethers");
const User = require("../models/User");
const { wallet, my_contract } = require("../wallet");

const options = {
  gasLimit: 3000000,
  gasPrice: ethers.BigNumber.from("200000000000"),
};
const connect = my_contract.connect(wallet);

const Register = async (req, res) => {
  const { name, email_address, age, address, password } = req.body;
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
      age,
      address,
      password,
    });
    res.status(200).json({
      type: "success",
      message: "User Registered Successfully",
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
      message: "User Registered Successfully",
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
  Register,
  Login,
};

const Exchange = require("../models/Exchange");
const { ethers } = require("ethers");
const { wallet, my_contract } = require("../wallet");
const User = require("../models/User");
const Cart = require("../models/Cart");

const options = {
  gasLimit: 3000000,
  gasPrice: ethers.BigNumber.from("200000000000"),
};
const connect = my_contract.connect(wallet);

const PatientReportExchange = async (req, res) => {
  const { user_id } = req.cookies;
  try {
    const cart_response = await Cart.find({ user_id }).lean();
    const user_response = await User.findById(user_id).lean();
    cart_response.forEach(async (item) => {
      const exchange_response = new Exchange({
        user_id,
        report_id: item.report_id,
      });
      await exchange_response.validate();
      // await Blockchain_SellReport(user_response.name, user_id, exchange_response.report_id);
      await exchange_response.save();
      await Cart.findByIdAndDelete(item._id);
    });
    res.send("Report Exchanged Successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const Blockchain_SellReport = async (owner, user_id, report_id) => {
  const tx = await connect.sell(owner, user_id, report_id);
  console.log(await tx, "Report sold successfully");
};

module.exports = {
  PatientReportExchange,
};

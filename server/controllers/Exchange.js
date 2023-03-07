const Exchange = require("../models/Exchange");
const { ethers } = require("ethers");
const { wallet, my_contract } = require("../wallet");
const User = require("../models/User");

const options = {
  gasLimit: 3000000,
  gasPrice: ethers.BigNumber.from("200000000000"),
};
const connect = my_contract.connect(wallet);

const PatientReportExchange = async (req, res) => {
  const { report_id } = req.params;
  const { user_id } = req.cookies;
  try {
    await Exchange.create({
      user_id,
      report_id,
    });
    const user_response = await User.findById(user_id).lean();
    await Blockchain_SellReport(user_response.name, user_id, report_id);
    res.json({
      type: "success",
      message: "Report Exchanged Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ type: "error", message: err.message });
  }
};

const Blockchain_SellReport = async (owner, user_id, report_id) => {
  try {
    const tx = await connect.sell(owner, user_id, report_id);
    console.log(await tx, "Report sold successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  PatientReportExchange,
};

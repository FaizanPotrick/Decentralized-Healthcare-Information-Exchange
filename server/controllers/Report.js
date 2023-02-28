const { ethers } = require("ethers");
const { wallet, my_contract } = require("../wallet");

const options = {
  gasLimit: 3000000,
  gasPrice: ethers.BigNumber.from("200000000000"),
};
const connect = my_contract.connect(wallet);

const Register = async (id, user_id, CID) => {
  try {
    const tx = await connect.Uploading(id, user_id, CID, options);
    console.log(await tx, "Uploaded Successfully");
  } catch (err) {
    console.log(err);
  }
};

const ReportForSale = async (id, owner) => {
  try {
    const tx = await connect.fileForSale(id, owner);
    console.log(await tx, "Report for sale");
  } catch (err) {
    console.log(err);
  }
};

const ReportNotForSale = async (td, owner) => {
  try {
    const tx = await connect.fileNotForSale(id, owner);
    console.log(await tx, "Report not for sale");
  } catch (err) {
    console.log(err);
  }
};

const SellReport = async (owner, user_id, report_id) => {
  try {
    const tx = await connect.sell(owner, user_id, report_id);
    console.log(await tx, "Report sold successfully");
  } catch (err) {
    console.log(err);
  }
};

const Owner_Report = async (id, owner) => {
  try {
    const response = await connect.getFileForOwner(id, owner);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const Buyer_Report = async (id, owner) => {
  try {
    const response = await connect.getFileForBuyer(id, owner);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  Register,
  ReportForSale,
  ReportNotForSale,
  SellReport,
  Owner_Report,
  Buyer_Report,
};

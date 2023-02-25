const { ethers } = require("ethers");
const { wallet, my_contract } = require("../wallet");

const options = {
  gasLimit: 3000000,
  gasPrice: ethers.BigNumber.from("200000000000"),
};
const connect = my_contract.connect(wallet);

async function User(id, address, name, role) {
  try {
    const tx = await connect.registerUser(id, address, name, role, options);
    console.log(await tx, "Registered Successfully");
  } catch (err) {
    console.log(err);
  }
}

async function Report(id, user_id, CID) {
  try {
    const tx = await connect.Uploading(id, user_id, CID, options);
    console.log(await tx, "Uploaded Successfully");
  } catch (err) {
    console.log(err);
  }
}

async function ReportForSale(id, owner) {
  try {
    const tx = await connect.fileForSale(id, owner);
    console.log(await tx, "Report for sale");
  } catch (err) {
    console.log(err);
  }
}

async function ReportNotForSale(td, owner) {
  try {
    const tx = await connect.fileNotForSale(id, owner);
    console.log(await tx, "Report not for sale");
  } catch (err) {
    console.log(err);
  }
}

async function SellReport(owner, user_id, report_id) {
  try {
    const tx = await connect.sell(owner, user_id, report_id);
    console.log(await tx, "Report sold successfully");
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  User,
  Report,
  ReportForSale,
  ReportNotForSale,
  SellReport,
};

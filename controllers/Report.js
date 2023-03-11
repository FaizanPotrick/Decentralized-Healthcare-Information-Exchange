const { ethers } = require("ethers");
const { wallet, my_contract } = require("../wallet");
const Report = require("../models/Report");
const Exchange = require("../models/Exchange");

const options = {
  gasLimit: 3000000,
  gasPrice: ethers.BigNumber.from("200000000000"),
};
const connect = my_contract.connect(wallet);

const PatientReportRegister = async (req, res) => {
  const {
    name,
    description,
    age,
    type,
    disease,
    criticality,
    date,
    price,
    cid,
  } = req.body;
  const user_id = req.cookies.user_id;
  try {
    const response = await Report.create({
      patient_id: user_id,
      name,
      description,
      age,
      type,
      disease,
      criticality,
      date,
      price,
    });
    await BlockChain_Report_Upload(response._id, user_id, cid);
    await Blockchain_ReportForSale(response._id, user_id);
    res.json({
      type: "success",
      message: "Report Uploaded Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ type: "error", message: err.message });
  }
};

const DoctorReportRegister = async (req, res) => {
  const {
    patient_id,
    name,
    description,
    age,
    type,
    disease,
    criticality,
    date,
    cid,
  } = req.body;
  try {
    const response = await Report.create({
      patient_id,
      name,
      description,
      age,
      type,
      disease,
      criticality,
      date,
    });
    await BlockChain_Report_Upload(response._id, patient_id, cid);
    res.json({
      type: "success",
      message: "Report Uploaded Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ type: "error", message: err.message });
  }
};

const UpdatePrice = async (req, res) => {
  const { price } = req.body;
  const { report_id } = req.params;
  try {
    await Report.findByIdAndUpdate(report_id, { price });
    res.json({
      type: "success",
      message: "Price Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ type: "error", message: err.message });
  }
};

const GetAllReports = async (req, res) => {
  try {
    const response = await Report.find();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({ type: "error", message: err.message });
  }
};

const GetPatientReports = async (req, res) => {
  const { user_id } = req.cookies;
  try {
    const response = await Report.find({
      patient_id: user_id,
    }).lean();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({ type: "error", message: err.message });
  }
};

const GetBuyerReports = async (req, res) => {
  const { user_id } = req.cookies;
  try {
    const patient_ids = await Exchange.find({
      buyer_id: user_id,
    }).lean();
    const response = await Report.find({
      patient_id: patient_ids,
    }).lean();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({ type: "error", message: err.message });
  }
};

const GetReport = async (req, res) => {
  const { report_id } = req.params;
  const { user_type } = req.cookies;
  try {
    const response = await Report.findById(report_id).lean();
    if (user_type === "patient") {
      const user_response = await User.findById(response.patient_id).lean();
      const blockchain_patient_response = await connect.getFileForOwner(
        response._id,
        user_response.name
      );
      response.cid = blockchain_patient_response;
    } else {
      const exchange_response = await Exchange.findOne({
        report_id: response._id,
      }).lean();
      const user_response = await User.findById(
        exchange_response.user_id
      ).lean();
      const blockchain_buyer_response = await connect.getFileForBuyer(
        response._id,
        user_response.name
      );
      response.cid = blockchain_buyer_response;
    }
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({ type: "error", message: err.message });
  }
};

const BlockChain_Report_Upload = async (id, user_id, CID) => {
  try {
    const tx = await connect.Uploading(id, user_id, CID, options);
    console.log(await tx, "Uploaded Successfully");
  } catch (err) {
    console.log(err);
  }
};

const Blockchain_ReportForSale = async (id, owner) => {
  try {
    const tx = await connect.fileForSale(id, owner);
    console.log(await tx, "Report for sale");
  } catch (err) {
    console.log(err);
  }
};

// const ReportNotForSale = async (td, owner) => {
//   try {
//     const tx = await connect.fileNotForSale(id, owner);
//     console.log(await tx, "Report not for sale");
//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports = {
  PatientReportRegister,
  DoctorReportRegister,
  UpdatePrice,
  GetAllReports,
  GetPatientReports,
  GetBuyerReports,
  GetReport,
};

const { ethers } = require("ethers");
const { wallet, my_contract } = require("../wallet");
const Report = require("../models/Report");
const Exchange = require("../models/Exchange");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const User = require("../models/User");

const options = {
  gasLimit: 3000000,
  gasPrice: ethers.BigNumber.from("200000000000"),
};
const connect = my_contract.connect(wallet);

const UploadReport = async (req) => {
  const { report } = req.files;
  await report.mv(`./test/${report.name}`);
  const formData = new FormData();
  formData.append("file", fs.createReadStream(`./test/${report.name}`));
  const { data } = await axios({
    method: "post",
    url: process.env.PINATA_URL,
    data: formData,
    headers: {
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
      "Content-Type": "multipart/form-data",
    },
  });
  return `ipfs://${data.IpfsHash}`
};

const PatientReportRegister = async (req, res) => {
  const {
    name,
    description,
    patient_age,
    type,
    disease,
    criticality,
    date,
    price,
  } = req.body;
  const { user_id } = req.cookies;
  const report_response = new Report({
    patient_id: user_id,
    name,
    description,
    patient_age,
    type,
    disease,
    criticality,
    date,
    price,
  });
  const { report } = req.files;
  try {
    await report_response.validate();
    const cid = await UploadReport(req);
    await BlockChain_Report_Upload(report_response._id, user_id, cid);
    await Blockchain_ReportForSale(report_response._id, user_id);
    await report_response.save();
    fs.unlink(`./test/${report.name}`, function (err) {
      if (err) {
        console.log(err);
      }
    })
    res.send("Report Uploaded Successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DoctorReportRegister = async (req, res) => {
  const {
    patient_id,
    name,
    description,
    patient_age,
    type,
    disease,
    criticality,
    date,
  } = req.body;
  const report_response = new Report({
    patient_id,
    name,
    description,
    patient_age,
    type,
    disease,
    criticality,
    date,
  });
  const { report } = req.files;
  try {
    await report_response.validate();
    const cid = await UploadReport(req);
    await BlockChain_Report_Upload(report_response._id, patient_id, cid);
    await report_response.save();
    fs.unlink(`./test/${report.name}`, function (err) {
      if (err) {
        console.log(err);
      }
    })
    res.send("Report Uploaded Successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const UpdatePrice = async (req, res) => {
  const { price } = req.body;
  const { report_id } = req.params;
  try {
    await Report.findByIdAndUpdate(report_id, { price });
    res.send("Price Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DeleteReport = async (req, res) => {
  const { report_id } = req.params;
  try {
    await Report.deleteOne({
      _id: report_id,
    });
    res.send("Report Deleted Successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
}

const GetAllReports = async (req, res) => {
  try {
    const response = await Report.aggregate([
      {
        $match: {
          price: { $exists: true },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "patient_id",
          foreignField: "_id",
          as: "patient",
        },
      },
      {
        $unwind: "$patient",
      },
    ]);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
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
    console.error(err);
    res.status(400).send(err.message);
  }
};

const GetBuyerReports = async (req, res) => {
  const { user_id } = req.cookies;
  try {
    const patient_ids = await Exchange.find({
      user_id,
    }).distinct("report_id").lean();
    const response = await Report.find({
      _id: patient_ids,
    }).lean();
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const GetReport = async (req, res) => {
  const { report_id } = req.params;
  try {
    const response = await Report.findById(report_id).lean();
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const GetPatientCID = async (req, res) => {
  const { report_id } = req.params;
  const { user_id } = req.cookies;
  try {
    const response = await Report.findById(report_id).lean();
    const cid = await connect.getFileForOwner(
      response._id,
      user_id
    );
    res.send(cid);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const GetBuyerCID = async (req, res) => {
  const { report_id } = req.params;
  // const { user_id } = req.cookies;
  try {
    const response = await Report.findById(report_id).lean();
    const cid = await connect.getFileForOwner(
      response._id,
      response.patient_id.toString(),
    );
    // const cid = await connect.getFileForBuyer(
    //   response._id,
    //   user_id
    // );
    res.send(cid);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const BlockChain_Report_Upload = async (id, user_id, CID) => {
  const tx = await connect.Uploading(id, user_id, CID, options);
  console.log(await tx, "Uploaded Successfully");
};

const Blockchain_ReportForSale = async (id, owner) => {
  const tx = await connect.fileForSale(id, owner, options);
  console.log(await tx, "Report for sale");
};

// const ReportNotForSale = async (td, owner) => {
//     const tx = await connect.fileNotForSale(id, owner);
//     console.log(await tx, "Report not for sale");
// };

module.exports = {
  PatientReportRegister,
  DoctorReportRegister,
  UpdatePrice,
  DeleteReport,
  GetAllReports,
  GetPatientReports,
  GetBuyerReports,
  GetReport,
  GetPatientCID,
  GetBuyerCID,
};

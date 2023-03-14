const express = require("express");
const {
  PatientRegister,
  DoctorRegister,
  BuyerRegister,
  GetPatient,
  Login,
} = require("../controllers/User");
const {
  PatientReportRegister,
  DoctorReportRegister,
  UpdatePrice,
  DeleteReport,
  GetAllReports,
  GetPatientReports,
  GetBuyerReports,
  GetReport,
  GetPatientCID,
  GetBuyerCID
} = require("../controllers/Report");
const { PatientReportExchange } = require("../controllers/Exchange");
const { AddToCart, RemoveFromCart, GetCart } = require("../controllers/Cart");
const router = express.Router();

router.post("/registration/patient", PatientRegister);
router.post("/registration/doctor", DoctorRegister);
router.post("/registration/buyer", BuyerRegister);
router.put("/login", Login);
router.post("/registration/report/patient", PatientReportRegister);
router.post("/registration/report/doctor", DoctorReportRegister);
router.put("/registration/report/price/:report_id", UpdatePrice);
router.get("/registration/report/remove/:report_id", DeleteReport);
router.get("/report/all", GetAllReports);
router.get("/report/patient", GetPatientReports);
router.get("/report/buyer", GetBuyerReports);
router.get("/report/:report_id", GetReport); // remaining
router.get("/registration/cart/add/:report_id", AddToCart);
router.get("/registration/cart/remove/:report_id", RemoveFromCart);
router.get("/cart", GetCart);
router.get("/patient", GetPatient);
router.get("/registration/report/exchange", PatientReportExchange);
router.get("/report/patient/cid/:report_id", GetPatientCID);

router.get("/report/buyer/cid/:report_id", GetBuyerCID); // remaining

module.exports = router;

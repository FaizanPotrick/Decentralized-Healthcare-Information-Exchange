const express = require("express");
const {
  PatientRegister,
  DoctorRegister,
  BuyerRegister,
  Login,
} = require("../controllers/User");
const {
  PatientReportRegister,
  DoctorReportRegister,
  UpdatePrice,
  GetAllReports,
  GetPatientReports,
  GetBuyerReports,
  GetReport,
} = require("../controllers/Report");
const { PatientReportExchange } = require("../controllers/Exchange");
const router = express.Router();

router.post("/registration/patient", PatientRegister);
router.post("/registration/doctor", DoctorRegister);
router.post("/registration/buyer", BuyerRegister);
router.put("/login", Login);
router.post("/registration/report/patient", PatientReportRegister);
router.post("/registration/report/doctor", DoctorReportRegister);
router.put("/registration/report/price/:report_id", UpdatePrice);
router.get("/registration/report/all", GetAllReports);
router.get("/registration/report/patient", GetPatientReports);
router.get("/registration/report/buyer", GetBuyerReports);
router.get("/registration/report/:report_id", GetReport);
router.post("/registration/report/exchange/:report_id", PatientReportExchange);

module.exports = router;

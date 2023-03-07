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
} = require("../controllers/Report");
const router = express.Router();

router.post("/registration/patient", PatientRegister);
router.post("/registration/doctor", DoctorRegister);
router.post("/registration/buyer", BuyerRegister);
router.put("/login", Login);
router.post("/registration/report/patient", PatientReportRegister);
router.post("/registration/report/doctor", DoctorReportRegister);

module.exports = router;

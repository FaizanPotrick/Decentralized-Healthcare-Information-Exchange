const express = require("express");
const {
  PatientRegister,
  DoctorRegister,
  BuyerRegister,
  Login,
} = require("../controllers/User");
const router = express.Router();

router.post("/registration/patient", PatientRegister);
router.post("/registration/doctor", DoctorRegister);
router.post("/registration/buyer", BuyerRegister);
router.put("/login", Login);

module.exports = router;

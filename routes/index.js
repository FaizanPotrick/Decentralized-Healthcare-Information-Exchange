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
router.get("/report/:report_id", GetReport);
router.get("/registration/cart/add/:report_id", AddToCart);
router.get("/registration/cart/remove/:report_id", RemoveFromCart);
router.get("/cart", GetCart);
router.get("/patient", GetPatient);


router.post("/registration/report/exchange/:report_id", PatientReportExchange);

module.exports = router;

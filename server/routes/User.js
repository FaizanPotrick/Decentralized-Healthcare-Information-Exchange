const express = require("express");
const { Register, Login } = require("../controllers/User");
const router = express.Router();

router.post("/user/register", Register);
router.put("/usr/login", Login);

module.exports = router;

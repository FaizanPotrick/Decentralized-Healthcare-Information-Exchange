require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
// const { User, Report } = require("./controllers/Register");

const app = express();

app.use(cors);
app.use(cookieParser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./routes/User"));

// User("11", "0xBf75AA7352F1A7E9B4863b5B6F9B3c56629d0Ea9", "sidp", "2");
// Report("2","11","QmVyvJbRmhnheEwvd4Zns4SoKypwQscPn1mkgRv2aJPriB");

app.listen(process.env.PORT || 8000);

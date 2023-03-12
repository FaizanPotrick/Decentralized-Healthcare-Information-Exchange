require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");

const app = express();

try {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileupload());

app.use("/api", require("./routes"));
app.get("/api/logout", (req, res) => {
  res.clearCookie("user_id").clearCookie("user_type").json({
    type: "success",
    message: "Successfully logged out"
  })
});

app.listen(process.env.PORT || 8000);

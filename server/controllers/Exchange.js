const Exchange = require("../models/Exchange");

const PatientReportExchange = async (req, res) => {
  const { report_id } = req.params;
  const { user_id } = req.cookies;
  try {
    await Exchange.create({
      user_id,
      report_id,
    });
    res.json({
      type: "success",
      message: "Report Exchanged Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ type: "error", message: err.message });
  }
};

module.exports = {
  PatientReportExchange,
};

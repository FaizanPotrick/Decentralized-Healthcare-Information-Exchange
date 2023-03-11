const Cart = require("../models/Cart");

const AddToCart = async (req, res) => {
  const { report_id } = req.params;
  const { user_id } = req.cookies;
  try {
    await Cart.create({
      user_id,
      report_id,
    });
    res.json({
      type: "success",
      message: "Successfully Added",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ type: "error", message: err.message });
  }
};

const RemoveFromCart = async (req, res) => {
  const { report_id } = req.params;
  const { user_id } = req.cookies;
  try {
    await Cart.deleteOne({
      user_id,
      report_id,
    });
    res.json({
      type: "success",
      message: "Successfully Removed",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ type: "error", message: err.message });
  }
};

const GetCart = async (req, res) => {
  const { user_id } = req.cookies;
  try {
    const response = await Cart.aggregate([
      {
        $match: {
          user_id,
        },
      },
      {
        $lookup: {
          from: "reports",
          localField: "report_id",
          foreignField: "_id",
          as: "report",
        },
      },
      {
        $unwind: "$report",
      },
    ]);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(400).json({ type: "error", message: err.message });
  }
};

module.exports = {
  AddToCart,
  RemoveFromCart,
  GetCart,
};

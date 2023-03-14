const Cart = require("../models/Cart");
const mongoose = require("mongoose");

const AddToCart = async (req, res) => {
  const { report_id } = req.params;
  const { user_id } = req.cookies;
  try {
    const cart_response = await Cart.findOne({
      user_id,
      report_id,
    });
    if (cart_response) {
      return res.send("Successfully Added");
    }
    await Cart.create({
      user_id,
      report_id,
    });
    res.send("Successfully Added");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const RemoveFromCart = async (req, res) => {
  const { report_id } = req.params;
  try {
    await Cart.deleteOne({
      _id: report_id,
    });
    res.send("Successfully Removed");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const GetCart = async (req, res) => {
  const { user_id } = req.cookies;
  try {
    const response = await Cart.aggregate([
      {
        $match: {
          user_id: mongoose.Types.ObjectId(user_id),
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
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "patient",
        },
      },
      {
        $unwind: "$patient",
      },
    ]);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

module.exports = {
  AddToCart,
  RemoveFromCart,
  GetCart,
};

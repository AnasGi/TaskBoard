const asyncWrapper = require("../middleware/async");
const Rate = require("../models/Rate");

const getAllRatings = asyncWrapper(async (req, res) => {
  const ratings = await Rate.find({});
  res.status(200).json({ ratings });
});

const storeRating = asyncWrapper(async (req, res) => {
  const rating = await Rate.create(req.body);
  res.status(201).json({ rating });
});

module.exports = {
  storeRating,
  getAllRatings,
};
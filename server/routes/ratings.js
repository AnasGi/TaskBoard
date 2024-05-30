const express = require("express");
const route = express.Router();
const {
    getAllRatings,
    storeRating,
} = require("../controllers/ratings");

route.route("/").get(getAllRatings).post(storeRating);

module.exports = route;

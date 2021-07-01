const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
  reviewHeading: {
    type: String,
    required: true,
  },
  reviewBody: {
    type: String,
    required: true,
  },
  parentName: {
    type: String,
    required: true,
  },
  parentIdentifyer: {
    type: String,
    required: true,
  },
});

const Reviews = mongoose.model("ReviewsData", ReviewsSchema);
module.exports = Reviews;

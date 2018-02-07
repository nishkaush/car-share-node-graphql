const mongoose = require("mongoose");

const bidsSchema = new mongoose.Schema({
  username: {
    type: String
  },
  bidPrice: {
    type: Number
  },
  bidStatus: {
    type: String,
    default: "pending"
  }
});

const adSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true
  },
  datePosted: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  vehicle: {
    type: String,
    required: true
  },
  passengers: {
    type: Number,
    required: true
  },
  travelDate: {
    type: String,
    required: true
  },
  additionalNote: {
    type: String,
    default: "NA"
  },
  adStatus: {
    type: String,
    default: "onGoing"
  },
  adsBids: [bidsSchema]
});

let Ad = mongoose.model("Ad", adSchema);

module.exports = { Ad };

const { mongoose } = require("./../mongoose/mongoose");

const adPostedSchema = new mongoose.Schema({
  adId: {
    type: mongoose.Schema.Types.ObjectId
    // required: true
  },
  datePosted: {
    type: String
    // required: true,
  },
  adStatus: {
    type: String,
    default: "onGoing"
  },
  to: {
    type: String
    // required: true
  },
  from: {
    type: String
    // required: true
  }
});

const bidSchema = new mongoose.Schema({
  adId: {
    type: mongoose.Schema.Types.ObjectId
  },
  to: {
    type: String
  },
  from: {
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

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  adsPosted: [adPostedSchema],
  userBids: [bidSchema]
});

let User = mongoose.model("User", userSchema);

module.exports = { User };

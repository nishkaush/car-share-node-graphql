const { User } = require("./../../db/models/users");
const { Ad } = require("./../../db/models/ads");

const approveBidResolvers = {
  Mutation: {
    approveBid(root, { adId, owner, winnerName }) {
      return Ad.findOneAndUpdate(
        { _id: adId },
        { $set: { adStatus: "finished" } },
        { new: true }
      )
        .then(res => {
          return updateAdsBidsWinner(adId, winnerName);
        })
        .then(res => {
          return updateAdsBidsLosers(adId, winnerName);
        })
        .then(res => {
          return updateBidStatusForWinner(adId, winnerName);
        })
        .then(res => {
          return updateBidStatusForLosers(adId, winnerName);
        })
        .then(res => {
          return updateAdStatusForOwner(adId, owner);
        })
        .then(res => {
          let finalArr = res.adsPosted.filter(e => e.adStatus === "onGoing");
          return finalArr.reverse();
        })
        .catch(err => err);
    }
  }
};

function updateAdsBidsWinner(adId, winnerName) {
  return Ad.findOneAndUpdate(
    { _id: adId, "adsBids.username": winnerName },
    { $set: { "adsBids.$.bidStatus": "successful" } }
  );
}

function updateAdsBidsLosers(adId, winnerName) {
  return Ad.findOneAndUpdate(
    { _id: adId, "adsBids.username": { $ne: winnerName } },
    { $set: { "adsBids.$[].bidStatus": "unsuccessful" } },
    { multi: true }
  );
}

function updateBidStatusForWinner(adId, winnerName) {
  return User.findOneAndUpdate(
    { username: winnerName, "userBids.adId": adId },
    { $set: { "userBids.$.bidStatus": "successful" } }
  );
}

function updateBidStatusForLosers(adId, winnerName) {
  return User.updateMany(
    { username: { $ne: winnerName }, "userBids.adId": adId },
    { $set: { "userBids.$.bidStatus": "unsuccessful" } }
  );
}

function updateAdStatusForOwner(adId, owner) {
  return User.findOneAndUpdate(
    { username: owner, "adsPosted.adId": adId },
    { $set: { "adsPosted.$.adStatus": "finished" } },
    { new: true }
  )
    .then(res => res)
    .catch(err => err);
}

module.exports = { approveBidResolvers };

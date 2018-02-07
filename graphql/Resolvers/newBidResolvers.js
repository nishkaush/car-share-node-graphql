const { User } = require("./../../db/models/users");
const { Ad } = require("./../../db/models/ads");

function updateExistingBidInUser({ username, id, bidPrice }) {
  return User.findOneAndUpdate(
    { username, "userBids.adId": id },
    { $set: { "userBids.$.bidPrice": bidPrice } },
    { new: true }
  )
    .then(res => res)
    .catch(err => err);
}

function addNewBidInUser({ username, id, to, from, bidPrice }) {
  return User.findOneAndUpdate(
    { username },
    {
      $addToSet: {
        userBids: {
          $each: [
            {
              adId: id,
              to,
              from,
              bidPrice
            }
          ]
        }
      }
    },
    { new: true }
  )
    .then(res => res)
    .catch(err => err);
}

// ================================================================
// Main Function Starts here
// ================================================================
const newBidResolvers = {
  Mutation: {
    placeNewBid(root, args) {
      return User.findOne({ username: args.input.username })
        .then(res => {
          let existingBid = res.userBids.find(
            e => e.adId.toString() === args.input.id.toString()
          );
          return existingBid !== undefined
            ? updateExistingBidInUser(args.input)
            : addNewBidInUser(args.input);
        })
        .then(res => {
          return pushBidIntoAd(args.input);
        })
        .then(re => {
          return re.adsBids;
        })
        .catch(err => {
          return { error: "error in mongoose" };
        });
    }
  }
};
// ================================================================
// Main Function Ends here
// ================================================================

function pushBidIntoAd({ id, username, bidPrice }) {
  return Ad.findOne({ _id: id })
    .then(res => {
      let existingBid = res.adsBids.find(e => e.username === username);
      return existingBid !== undefined
        ? updateExistingBidInAd(id, username, bidPrice)
        : addNewBidInAd(id, username, bidPrice);
    })
    .catch(err => err);
}

function updateExistingBidInAd(id, username, bidPrice) {
  return Ad.findOneAndUpdate(
    { _id: id, "adsBids.username": username },
    { $set: { "adsBids.$.bidPrice": bidPrice } },
    { new: true }
  ).then(res => res);
}

function addNewBidInAd(id, username, bidPrice) {
  return Ad.findOneAndUpdate(
    { _id: id },
    {
      $addToSet: {
        adsBids: {
          $each: [{ username, bidPrice }]
        }
      }
    },
    { new: true }
  ).then(res => res);
}
module.exports = { newBidResolvers };

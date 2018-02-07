const { Ad } = require("./../../db/models/ads");

const AllBidsForAdResolvers = {
  Query: {
    allBidsForAd(root, args) {
      return Ad.findById(args.adId)
        .then(res => res.adsBids)
        .catch(err => err);
    }
  }
};

module.exports = { AllBidsForAdResolvers };

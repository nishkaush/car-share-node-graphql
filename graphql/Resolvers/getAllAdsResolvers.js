const { Ad } = require("./../../db/models/ads");

const getAllAdsResolvers = {
  Query: {
    getAllAds(root, args) {
      return Ad.find({ adStatus: args.adStatus })
        .sort({ _id: -1 })
        .skip(args.skip)
        .limit(4)
        .then(res => {
          return res;
        })
        .catch(err => {
          return [{ error: "Error while fetching ads" }];
        });
    }
  }
};

module.exports = { getAllAdsResolvers };

const { Ad } = require("./../../db/models/ads");

const getSingleAdResolvers = {
  Query: {
    getSingleAd(root, args) {
      return Ad.findOne({ _id: args.id })
        .then(res => {
          return res;
        })
        .catch(err => {
          return { error: "error while fetching ad" };
        });
    }
  }
};

module.exports = { getSingleAdResolvers };

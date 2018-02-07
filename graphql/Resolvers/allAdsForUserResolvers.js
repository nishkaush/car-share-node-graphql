const { User } = require("./../../db/models/users");

const allAdsForUserResolvers = {
  Query: {
    allAdsForUser(root, args) {
      return User.findOne({ username: args.username })
        .then(res => {
          let finalArr = res.adsPosted.filter(
            e => e.adStatus === args.adStatus
          );
          return finalArr.reverse();
        })
        .catch(err => err);
    }
  }
};

module.exports = { allAdsForUserResolvers };

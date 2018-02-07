const { User } = require("./../../db/models/users");
const { Ad } = require("./../../db/models/ads");

const allBidsForUserResolvers = {
  Query: {
    allBidsForUser(root, args) {
      return User.findOne({ username: args.username })
        .then(res => {
          return res.userBids.reverse();
        })
        .catch(err => err);
    }
  }
};

module.exports = { allBidsForUserResolvers };

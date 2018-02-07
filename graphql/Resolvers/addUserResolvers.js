//We add new user and new Ad with this file
//We can also use a user's username to get all her details

const { User } = require("./../../db/models/users");
const { Ad } = require("./../../db/models/ads");

const addUserResolvers = {
  Mutation: {
    addUser(root, args) {
      return User.findOne({ username: args.username })
        .then(res => {
          return !res ? saveToDB(args.username) : res.username;
        })
        .catch(err => {
          return err;
        });
    },
    createNewAd(root, args) {
      const newAd = new Ad(args.input);
      return newAd
        .save()
        .then(res => {
          pushAdToUser(res);
          res._id = res._id.toString();
          return res;
        })
        .catch(err => {
          return err;
        });
    }
  },
  Query: {
    username(root, { name }) {
      return User.findOne({ username: name }).then(res => {
        return res;
      });
    }
  }
};

//extracted this func here to space out the code in resolvers
function saveToDB(username) {
  const newUser = new User({ username });
  return newUser
    .save()
    .then(res => {
      return res.username;
    })
    .catch(err => {
      return "couldn't post to mongodb, sorry!!";
    });
}

function pushAdToUser({ owner, datePosted, adStatus, _id, to, from }) {
  console.log("pushAdToUser is running");
  return User.findOneAndUpdate(
    { username: owner },
    {
      $push: {
        adsPosted: {
          $each: [
            {
              adId: _id,
              datePosted,
              adStatus,
              to,
              from
            }
          ]
        }
      }
    }
  ).then(res => console.log("pushAdToUser response"));
}
module.exports = { addUserResolvers };

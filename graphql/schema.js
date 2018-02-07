const { merge } = require("lodash");
const { makeExecutableSchema } = require("graphql-tools");
const { addUserResolvers } = require("./Resolvers/addUserResolvers");
const { getAllAdsResolvers } = require("./Resolvers/getAllAdsResolvers");
const { getSingleAdResolvers } = require("./Resolvers/getSingleAdResolvers");
const { newBidResolvers } = require("./Resolvers/newBidResolvers");
const { AllBidsForAdResolvers } = require("./Resolvers/bidsForAdResolvers");
const {
  allAdsForUserResolvers
} = require("./Resolvers/allAdsForUserResolvers");
const { approveBidResolvers } = require("./Resolvers/approveBidResolvers");
const { allBidsForUserResolvers } = require("./Resolvers/allBidsForSingleUser");

const typeDefs = `
type Mutation {
  addUser (username:String!): String!
  createNewAd (input:formData!): Ad!
  placeNewBid (input:newBidArgs!): [BidForAd]
  approveBid (adId:ID!,owner:String!,winnerName:String!):[ads]
}
type Query {
  username (name:String): User
  getAllAds (skip:Int!, adStatus:String!): [Ad]!
  getSingleAd (id:ID!): Ad
  allBidsForAd (adId:ID!): [BidForAd]
  allBidsForUser (username:String!): [BidForUser]
  allAdsForUser (username:String!, adStatus:String!):[ads]
}
type User {
  username:String,
  adsPosted:[ads],
  userBids:[BidForUser]
}
type ads {
  adId:ID,
  datePosted:String,
  adStatus:String,
  to:String,
  from:String
}
input formData {
  owner: String!,
  datePosted: String!,
  to: String!,
  from: String!,
  vehicle: String!,
  passengers: Int!,
  travelDate: String!,
  additionalNote: String
}
input newBidArgs{
  id:ID!,
  username:String!,
  bidPrice:Int!,
  to:String!,
  from:String!
}
type Ad {
  _id:ID!,
  owner: String!,
  datePosted: String!,
  to: String!,
  from: String!,
  vehicle: String!,
  passengers: Int!,
  travelDate: String!,
  additionalNote: String,
  adStatus:String,
  adsBids:[BidForAd]
}
type BidForAd{
  username:String,
  bidPrice:Int,
  bidStatus:String
}
type BidForUser{
  adId:ID,
  to:String,
  from:String,
  bidPrice:Int,
  bidStatus:String
}
`;

const resolvers = merge(
  addUserResolvers,
  getAllAdsResolvers,
  getSingleAdResolvers,
  newBidResolvers,
  AllBidsForAdResolvers,
  allAdsForUserResolvers,
  approveBidResolvers,
  allBidsForUserResolvers
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = { schema };

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { schema } = require("./../graphql/schema");

let app = express();

let port = process.env.PORT || 3000;

let corsOptions = {
  origin: "http://car-share-app.s3-website-ap-southeast-2.amazonaws.com",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

var authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://pms.au.auth0.com/.well-known/jwks.json"
  }),
  audience: "http://localhost:3000",
  issuer: "https://pms.au.auth0.com/",
  algorithms: ["RS256"]
});

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

app.listen(port, () => {
  console.log("server is running on port 3000");
});

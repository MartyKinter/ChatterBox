const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

/** return signed JWT for payload {username, admin}. */

function createToken(id, username) {
  let payload = {id, username};
  return jwt.sign(payload, process.env.SECRET_KEY);
}


module.exports = createToken;
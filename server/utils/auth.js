const jwt = require('jsonwebtoken');
require('dotenv').config()


// set token secret and expiration date
const secret = process.env.REACT_APP_SESSION_SECRET;
const expiration = '15m';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.query.token || req.headers.authorization;
    // ["Bearer", "<tokenvalue>"]

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      return res.status(400).json({ message: 'invalid token!' });
    }
    return req;

  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  makeToken(payload) {
    return new Promise((resolve, reject) =>
      jwt.sign(
        payload,
        process.env.SERVER_SECRET,
        {
          expiresIn: '8h',
          issuer:    'PhilYoo',
        },
        (err, data) => err ? reject(err) : resolve(data),
      ),
    );
  },

  async verify(req, res, next) {
    let payload = await jwt.verify(
      req.body.token,
      process.env.SERVER_SECRET
    );
    if(payload.hasOwnProperty('org')) {
      res.locals.payload = payload;
      next();
    } else {
      console.log('invalid token signature')
      res.json({credentials: false})
    }
  },

  receiveToken(req, res, next) {
    if (req.headers.authorization) {
      req.authToken = req.headers.authorization.replace(/^Bearer\s/, '');
    }
    next();
  },

  decode(token) {
    return jwt.decode(token);
  },
};

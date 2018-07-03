const bcrypt = require('bcrypt');
const model = require('../server/models');
const TokenService = require('./TokenService');



module.exports = {
  async isValidUser(req, res, next) {
    try {
      const user = await model.findOneUser(req.body.username);
      res.locals.user = user;
      res.locals.ispassgood = await bcrypt.compare(req.body.password, user[0].pass_digest);
      next()
    } catch (err) {
      console.error(err);
    }
  },

  async generatePassword(req, res, next) {
    const { password } = req.body;
    await bcrypt.hash(password, 11)
      .then( (hash) => {
        res.locals.user = req.body;
        res.locals.user.pass_digest = hash;
        next();
      })
      .catch( (err) => {
        next(err);
      })
  },

  validRegistrant(req, res, next) {
    model.findPreAuthUser(req.body.username)
      .then(data => {
        if(data.length === 0) {
          res.json({
            valid: false,
            taken: false
          })
        } else if(data[0].taken === true) {
          res.json({
            valid: false,
            taken: true
          })
        } else {
          res.locals.dataset = {
            valid: true,
            org: data[0].org,
            email: data[0].email
          }
          next();
        }
      })
  },

  markTaken(req, res, next) {
    model.markPreAuthTaken(res.locals.dataset.email)
    .then(data => {
      next()
    })
    .catch(err => {
      next(err)
    })
  },

  doesUserExist(req, res, next) {
    req.body.username = req.body.username.toLowerCase();
    model.findOneUser(req.body.username)
      .then(data => {
        if(data.length !== 0){
          res.locals.dataset = {
            userExists: true
          }
          next();
        } else {
          res.locals.dataset = {
            userExists: false
          }
          next()
        }
      })
      .catch(err => {
        next(err);
      })

  },

  registerUser(req, res, next) {
    model.addUser(res.locals.user)
      .then( (data) => {
        next();
      })
      .catch((err) => {
        next(err);
      })
  },

  authenticate(req, res, next) {
    if (res.locals.ispassgood === false) {
      return next({});
    }
    TokenService.makeToken({
      org: res.locals.user[0].org,
    })
      .then((token) => {
        res.locals.token = token;
        next();
      })
      .catch(next);
        return false;
  },

  allow({ roles }) {
    return [
      (req, res, next) => {
        TokenService.verify(req.authToken)
          .then((payload) => {
            const isAuthorized = roles.some(n => payload.roles.includes(n));
            return isAuthorized ? next() : Promise.reject('User not authorized');
          })
          .catch(next);
      },
      (err, req, res, next) => {
        console.log(err);
        res.status(403).json({});
      },
    ];
  },

  killArray(user) {
    if(Array.isArray(user)) {
      return user[0];
    } else {
      return user;
    }
  }
};

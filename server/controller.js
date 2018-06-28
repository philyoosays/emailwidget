require('dotenv').config();
const http = require('http');
const model = require('./models');

module.exports = {
  verifySite(req, res, next) {
    console.log('ami running?', req.body)
    if(req.body.secret === process.env.REACT_APP_SECRET) {
      console.log('authorized api hit')
      next()
    } else {
      console.log('not authorized')
      res.send('not authorized')
    }
  },

  getOneCampaign(req, res, next) {
    model.findOneCampaign(parseInt(req.params.id))
      .then(data => {
        res.locals.dataset = data;
        next();
      })
      .catch(err => {
        next(err)
      })
  },

  isEnterprise(req, res, next) {
    fetch(`https://api.trumail.io/v2/lookups/json?email=${req.body.email}&token=${process.env.MAILAPI}`)
      .then(response => response.json())
        .then(data => {
          if(data.free === false) {
            res.locals.dataset.isEnterprise = true
            next();
          } else if(data.hasOwnProperty('message')) {
            next();
          }
        })
      .catch(error => {
        next(error)
      })
  },

  updateMessageText(req, res, next) {
    res.locals.dataset.emailtext = res.locals.dataset.emailtext.split('$$FNAME').join(`${req.body.fname}`);
    res.locals.dataset.emailtext = res.locals.dataset.emailtext.split('$$LNAME').join(req.body.lname);
    next();
  },

  makeSendLink(req, res, next) {
    let domain = req.body.email.split('@');
    if(req.body.isMobile === true || res.locals.dataset.isEnterprise === true) {
      res.locals.dataset.sendemail = `mailto:${res.locals.dataset.recipient}&subject=${res.locals.dataset.subject}&body=${res.locals.dataset.emailtext}`;
      res.locals.dataset.isMobile = true;
    } else if(domain[1] === 'gmail.com') {
      res.locals.dataset.sendemail = `https://mail.google.com/mail/?view=cm&fs=1&to=${res.locals.dataset.recipient}&su=${res.locals.dataset.subject}&body=${res.locals.dataset.emailtext}`;
    } else if(domain[1] === 'ymail.com' || domain === 'yahoo.com') {
      res.locals.dataset.sendemail = `http://compose.mail.yahoo.com/?to=${res.locals.dataset.recipient}&subject=${res.locals.dataset.subject}&body=${res.locals.dataset.emailtext}`;
    }
    next();
  }
}

require('dotenv').config();
const axios = require('axios');
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
    console.log('here')
    axios.get(`https://api.trumail.io/v2/lookups/json?email=${req.body.email}&token=${process.env.MAILAPI}`)
      .then(data => {
        console.log('is it? ', data.data.free)
        console.log('is it? ', typeof data.data.free)
        if(data.data.free === false) {
          console.log('here')
          res.locals.dataset.isEnterprise = true
          console.log('is enterprise')
          next();
        } else if(data.data.hasOwnProperty('message')) {
          console.log('is not enterprise')
          next();
        } else {
          next()
        }
      })
      .catch(error => {
        next(error)
      })
  },

  updateMessageText(req, res, next) {
    console.log('here;')
    res.locals.dataset.emailtext = res.locals.dataset.emailtext.split('#FIRST_NAME#').join(req.body.fname);
    res.locals.dataset.emailtext = res.locals.dataset.emailtext.split('#LAST_NAME#').join(req.body.lname);
    // res.locals.dataset.emailtext = res.locals.dataset.emailtext.split('%0A%0D').join('$nsbps;')
    next();
  },

  makeSendLink(req, res, next) {
    let domain = req.body.email.toLowerCase().split('@');

    if(req.body.isMobile === true || res.locals.dataset.isEnterprise === true) {
      res.locals.dataset.sendemail = `mailto:${res.locals.dataset.recipient}&subject=${res.locals.dataset.subject}&body=${res.locals.dataset.emailtext}`;
      res.locals.dataset.isMobile = req.body.isMobile;
      res.locals.dataset.isEnterprise = req.body.isEnterprise;

    } else if(domain[1].includes('gmail')) {
      res.locals.dataset.sendemail = `https://mail.google.com/mail/u/${req.body.email}/?view=cm&fs=1&to=${res.locals.dataset.recipient}&su=${res.locals.dataset.subject}&body=${res.locals.dataset.emailtext}&bcc=philyoomail@gmail.com`;

    } else if(domain[1].includes('ymail') || domain[1].includes('yahoo') || domain[1].includes('rocketmail')) {
      res.locals.dataset.emailtext = res.locals.dataset.emailtext.split('%0A%0D').join('%0D%0D%0D')
      res.locals.dataset.sendemail = `http://compose.mail.yahoo.com/?to=${res.locals.dataset.recipient}&subject=${res.locals.dataset.subject}&body=${res.locals.dataset.emailtext}`;

    } else if(domain[1].includes('aol')) {
      res.locals.dataset.sendemail = `http://webmail.aol.com/Mail/ComposeMessage.aspx?to=${res.locals.dataset.recipient}&subject=${res.locals.dataset.subject}&body=${res.locals.dataset.emailtext}`;

    } else if(domain[1].includes('hotmail') || domain[1].includes('live.co') || domain[1].includes('outlook') || domain[1].includes('msn.')) {
      res.locals.dataset.sendemail = `https://outlook.live.com/owa/#subject=${res.locals.dataset.subject}&body=${res.locals.dataset.emailtext}&to=${res.locals.dataset.recipient}&path=%2fmail%2faction%2fcompose`;

    } else {
      res.locals.dataset.sendemail = `mailto:${res.locals.dataset.recipient}&subject=${res.locals.dataset.subject}&body=${res.locals.dataset.emailtext}`;
    }
    next();
  }
}


















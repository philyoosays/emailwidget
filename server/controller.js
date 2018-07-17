require('dotenv').config();
const axios = require('axios');
const model = require('./models');

module.exports = {
  verifySite(req, res, next) {
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

  getCampaignContacts(req, res, next) {
    model.findAllCampaignSigners(parseInt(req.params.campaignid), res.locals.payload.org)
      .then(data => {
        res.locals.dataset = data;
        next();
      })
  },

  getNewCampaignContacts(req, res, next) {
    model.findNewCampaignContacts(parseInt(req.params.campaignid), res.locals.payload.org)
      .then(data => {
        res.locals.dataset = data;
        next();
      })
  },

  markCampExported(req, res, next) {
    model.markCampaignExported(parseInt(req.params.campaignid), res.locals.payload.org)
      .then(data => {
        next();
      })
  },

  isEnterprise(req, res, next) {
    console.log('here')
    axios.get(`https://api.trumail.io/v2/lookups/json?email=${req.body.email}&token=${process.env.MAILAPI}`)
      .then(data => {
        if(data.data.free === false) {
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
    res.locals.dataset.emailtext = res.locals.dataset.emailtext.split('#FIRST_NAME#').join(req.body.fname);
    res.locals.dataset.emailtext = res.locals.dataset.emailtext.split('#LAST_NAME#').join(req.body.lname);
    // res.locals.dataset.emailtext = res.locals.dataset.emailtext.split('%0A%0D').join('$nsbps;')
    next();
  },

  makeSendLink(req, res, next) {
    let domain = req.body.email.toLowerCase().split('@');
    console.log('reslocals', res.locals.dataset)
    if(req.body.isMobile === true || res.locals.dataset.isEnterprise === true) {
      let link = `mailto:${res.locals.dataset.recipientemail}?subject=${res.locals.dataset.subject}&body=${res.locals.dataset.emailtext}&bcc=philyoomail@gmail.com`;
      link = link.split(' ').join('%20');
      link = link.split('%0A%0D').join('%0A%0D%0A%0D');
      res.locals.dataset.sendemail = link;
      res.locals.dataset.isMobile = req.body.isMobile;
      res.locals.dataset.isEnterprise = req.body.isEnterprise;

    } else if(domain[1].includes('gmail')) {
      let link = `https://mail.google.com/mail/u/${req.body.email}/?view=cm&fs=1&to=${res.locals.dataset.recipientemail}&su=${res.locals.dataset.subject}&body=${res.locals.dataset.emailtext}&bcc=philyoomail@gmail.com`;
      link = link.split(' ').join('%20');
      res.locals.dataset.sendemail = link

    } else if(domain[1].includes('ymail') || domain[1].includes('yahoo') || domain[1].includes('rocketmail')) {
      let link = `http://compose.mail.yahoo.com/?to=${res.locals.dataset.recipientemail}&subject=${res.locals.dataset.subject}&body=${res.locals.dataset.emailtext}`;
      link = link.split(' ').join('%20');
      link = link.split('%0A%0D').join('%0A%0D%0A%0D');
      res.locals.dataset.sendemail = link;

    } else if(domain[1].includes('aol')) {
      let link = `http://webmail.aol.com/Mail/ComposeMessage.aspx?to=${res.locals.dataset.recipientemail}&subject=${res.locals.dataset.subject}&body=${res.locals.dataset.emailtext}`;
      link = link.split(' ').join('%20');
      res.locals.dataset.sendemail = link;

    } else if(domain[1].includes('hotmail') || domain[1].includes('live.co') || domain[1].includes('outlook') || domain[1].includes('msn.')) {
      let link = `https://outlook.live.com/owa/#subject=${res.locals.dataset.subject}&body=${res.locals.dataset.emailtext}&to=${res.locals.dataset.recipientemail}&path=%2fmail%2faction%2fcompose`;
      link = link.split(' ').join('%20');
      res.locals.dataset.sendemail = link;

    } else {
      let link = `mailto:${res.locals.dataset.recipientemail}?subject=${res.locals.dataset.subject}&body=${res.locals.dataset.emailtext}`;
      link = link.split(' ').join('%20');
      res.locals.dataset.sendemail = link;
    }
    next();
  },

  saveFormUser(req, res, next) {
    let theData = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      campaignid: parseInt(req.params.id),
      org: res.locals.dataset.org
    }
    model.saveFormUser(theData)
      .then(data => {
        next();
      })
      .catch(err => {
        next(err)
      })
  },

  getAllCampaigns(req, res, next) {
    model.findAllCampaigns(res.locals.payload.org)
      .then(data => {
        res.locals.dataset = data;
        next()
      })
      .catch(err => {
        next(err)
      })
  },

  numberOfSigners(req, res, next) {
    model.countOfSigners(res.locals.dataset.campaignid)
      .then(data => {
        console.log('data', data)
      })
  },

  convertToArrays(req, res, next) {
    let collection = [];
    collection.push([
      'dbID', 'fname', 'lname', 'email', 'campname', 'created'
      ])
    if(res.locals.dataset.length > 0) {
      res.locals.dataset.forEach(contact => {
        let row = [];
        row.push(contact.id);
        row.push(contact.fname);
        row.push(contact.lname);
        row.push(contact.email);
        row.push(contact.campname);
        row.push(contact.created);
        collection.push(row);
      })
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    collection.forEach(row => {
      let csvRow = row.join(',');
      csvContent += csvRow + '\r\n';
    })
    res.locals.dataset = csvContent;
    next();
  }
}


















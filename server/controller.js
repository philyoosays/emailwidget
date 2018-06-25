require('dotenv').config();
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
  }
}

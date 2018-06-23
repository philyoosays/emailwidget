module.exports = {

  handleUserLogin(req, res, next) {
    res.json({ token: res.locals.token })
  },

  tester(req, res, next) {
    console.log('we got this far')
    res.send('Hello Good Sir')
  },

  sendJSON(req,res) {
    res.json(res.locals.museum || res.locals.museums);
  },

  sendAPI(req, res) {
    res.json(res.locals.apikey);
  },

}

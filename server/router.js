const express = require('express');
const router = express.Router();

const controller = require('./controller');
const resHandler = require('./resHandler');

router.route('/campaign/:id')
  .post(
    // controller.verifySite,
    controller.getOneCampaign,
    resHandler.sendJSON
  )


module.exports = router;

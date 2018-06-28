const express = require('express');
const router = express.Router();

const controller = require('./controller');
const resHandler = require('./resHandler');

router.route('/campaign/:id')
  .post(
    controller.verifySite,
    controller.getOneCampaign,
    resHandler.sendJSON
  )

router.route('/email/:id')
  .post(
    controller.verifySite,
    controller.getOneCampaign,
    // controller.isEnterprise,
    controller.updateMessageText,
    controller.makeSendLink,
    resHandler.sendJSON
  )

module.exports = router;

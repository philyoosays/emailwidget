const express = require('express');
const router = express.Router();

const controller = require('./controller');
const resHandler = require('./resHandler');
const tokenService = require('../auth/TokenService')

router.route('/export/campaign/:campaignid')
  .post(
    controller.verifySite,
    tokenService.verify,
    controller.getCampaignContacts,
    controller.markCampExported,
    controller.convertToArrays,
    resHandler.sendJSON
  )

router.route('/campaign/:id')
  .post(
    controller.verifySite,
    controller.getOneCampaign,
    resHandler.sendJSON
  )

router.route('/organization')
  .post(
    controller.verifySite,
    tokenService.verify,
    controller.getAllCampaigns,
    resHandler.sendJSON
  )

router.route('/email/:id')
  .post(
    controller.verifySite,
    controller.getOneCampaign,
    // controller.isEnterprise,
    controller.updateMessageText,
    controller.makeSendLink,
    controller.saveFormUser,
    resHandler.sendJSON
  )

module.exports = router;

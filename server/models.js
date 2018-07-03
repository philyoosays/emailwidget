const db = require('../db/dbConfig')

module.exports = {
  addUser(data) {
    return db.none(`
      INSERT INTO users
       (fname, lname, email, pass_digest, org)
      VALUES
        ($/fname/, $/lname/, $/username/, $/pass_digest/, $/org/)
      `, data);
  },

  findOneUser(username) {
    return db.any(`
      SELECT * FROM users
      WHERE email = $1
      `, username);
  },

  findOneCampaign(id) {
    return db.one(`
      SELECT * FROM campaign
      WHERE id = $1
      `, id)
  },

  findPreAuthUser(email) {
    return db.any(`
      SELECT * FROM authorized
      WHERE email = $1
      `, email)
  },

  markPreAuthTaken(email) {
    return db.none(`
      UPDATE authorized
      SET taken = true
      WHERE email = $1
    `, email)
  },

  findAllCampaigns(org) {
    return db.any(`
      SELECT campaign.*, COUNT(contact.id)
      FROM campaign
      LEFT OUTER JOIN contact
      ON campaign.id = contact.campaignid
      GROUP BY campaign.id
      ORDER BY campaign.created DESC
      `, org);
  },

  saveFormUser(data) {
    return db.none(`
      INSERT INTO contact
      (fname, lname, email, campaignid, org)
      VALUES
      ($/fname/, $/lname/, $/email/, $/campaignid/, $/org/)
      `, data);
  },

  countOfSigners(campaign) {
    return d
  }
}



























